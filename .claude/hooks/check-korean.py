#!/usr/bin/env python3
"""마크다운을 쓴 직후에 애매어·LLM 말투·너무 긴 문장을 지적한다.

규약의 정본은 docs/guidelines/korean-writing-rules.md 다. 이 파일은 판정만 한다.
양쪽을 짝으로 유지한다(한쪽만 고치지 않는다).

출처: DataSpace-v2 `.claude/hooks/check-japanese.py`.
한국어판에서 새로 만든 것은 3가지다.
  ① 문장 분할 — 원본은 `。` 로만 잘라서 한국어가 통째로 1문이 된다
  ② 글자수 상한 — 한국어는 띄어쓰기가 있어 같은 내용이 일본어보다 길다
  ③ 금지어 표 — 한국어의 애매어·LLM 말투는 어형이 다르다

테스트: .claude/hooks/check-korean.test.sh
"""

# 어노테이션을 지연 평가시킨다(문자열로 둔다). macOS 시스템 파이썬은 3.9 이고,
# `str | None`(PEP 604)은 3.10 부터라 def 시점에 TypeError 로 죽는다.
# CI 는 3.12 라 안 잡힌다 — 로컬에서만 터지는 종류다.
from __future__ import annotations

import json
import re
import sys

# 규약 그 자체는 금지어를 예시로 싣기 때문에 검사에서 뺀다.
# ds-export/README.md 는 Claude Design 이 생성한 것이라 손대지 않는다(ADR-0005).
EXEMPT_SUFFIXES = (
    "docs/guidelines/korean-writing-rules.md",
    "design/ds-export/README.md",
)
# 원문 그대로 남기는 영역(인용·조사 노트).
# design/ds-export/project/ 는 Claude Design 의 생성물이다. 고치지 말라고 3곳에
# 써 두었으므로, 검사해서 손 편집을 요구하면 규칙끼리 충돌한다.
# design/ds-export/SOURCE.md 는 우리가 쓰는 문서라 여기 넣지 않는다 — 검사에 남긴다.
EXEMPT_DIRS = ("docs/research/", "design/ds-export/project/")

# 1문의 상한(자). 규약 R4.
#
# 일본어판은 120자다. 한국어는 띄어쓰기가 있어 같은 내용이 15~20% 길어지므로 140자로 둔다.
# 공백을 빼고 세면 개념상 깔끔하지만, 사람이 눈으로 셀 수 없어 채택하지 않았다.
SENTENCE_LIMIT = 140

# 한국어 문장 분할. 마침표·물음표·느낌표 뒤가 공백일 때만 자른다.
#
# 과분할은 무해하다 — 짧은 조각은 「긴 문장」 판정에 걸리지 않기 때문이다.
# 위험한 것은 미분할이다(원본이 그랬다). 그래서 단순한 규칙으로 둔다.
SENT_SPLIT = re.compile(r"(?<=[.!?])\s+")

LINK = re.compile(r"\[([^\]]*)\]\([^)]*\)")
INLINE_CODE = re.compile(r"`+[^`]*`+")
EMPHASIS = re.compile(r"[*_]{1,2}")
FENCE = re.compile(r"^\s*(```|~~~)")
HTML_COMMENT = re.compile(r"<!--.*?-->", re.S)
MAX_FINDINGS = 8  # 지적이 많을 때는 앞쪽만 낸다(읽을 수 없는 양을 돌려주지 않는다)

# 애매어. (정규식, 무리의 이름, 대신 쓸 것).
# 어휘의 열거는 korean-writing-rules.md R3 의 표와 짝으로 유지한다.
#
# 오탐을 줄이려고 일부러 뺀 말이 있다. 「잘」·「제대로」·「반드시」·「관점」은
# 정당한 용법이 훨씬 많아 넣지 않았다. 훅이 성가시면 사람이 꺼버리기 때문이다.
AMBIGUOUS: tuple[tuple[str, str, str], ...] = (
    (
        # 「~ㄹ 것이다」는 어간에 따라 을/일/될/할 로 갈린다. 종성 ㄹ 판정은
        # 정규식으로 못 하므로 어형을 열거한다. 「할 것이 많다」처럼 「것이」로
        # 끝나지 않는 형태는 잡지 않도록 어미를 「이다/입니다」로 묶는다.
        r"일 수도 있|라고 생각[되한]|로 보인다|[을일될할] 것(이다|입니다)|"
        r"인 듯|인 것 같|으로 여겨|라고 여겨",
        "추측",
        "단정해서 쓴다. 근거가 없으면 「미확인」·「미검증」이라고 쓴다",
    ),
    (
        r"가능성이 있|라고도 할 수 있|라고만은|경우에 따라서는|여지가 있",
        "판단의 보류",
        "어느 조건에서 그렇게 되는지 쓴다(「X일 때 깨진다」)",
    ),
    (
        r"없지는 않|않는 것은 아니|아니라고 할 수 없|못할 것도 없|없다고 볼 수는 없",
        "이중부정",
        "긍정문으로 쓴다",
    ),
    (
        r"어느 정도|일정 정도|적절히|적절한|가능한 한|되도록|최대한|대체로|"
        r"유연[하한]|필요에 따라|기본적으로|적당[히한]|어느 정도는",
        "정도·빈도의 흐리기",
        "수치·조건·대상을 쓴다(「3회까지」·「신규 파일만」)",
    ),
    (
        r"적인 부분|하는 방향으로|같은 느낌|느낌으로|측면이 있|하는 형태로",
        "추상명사",
        "대상과 조작을 이름으로 부른다(「테이블의 열 구성」·「PR의 분할 방법」)",
    ),
    (
        r"라든지|등등|같은 것들|와 같은 형태|이라든가",
        "애매한 예시·접속",
        "구체예를 열거하거나 조건으로 쓴다",
    ),
    # 아래는 규약 R6(LLM 말투). 논점을 늘리지 않고 「제대로 쓴 느낌」만 더하는 형태.
    (
        r"중요한 것은|이 장에서는|여기서는 .{0,12}(살펴|다루)|정리하자면|요컨대|"
        r"다름 아니|살펴보겠|알아보겠",
        "예고와 총괄",
        "주장을 그대로 쓴다(예고·바꿔 말한 총괄을 쓰지 않는다)",
    ),
    (
        r"불가결|핵심적인|근본적인|다각적|포괄적|종합적|중요한 역할|핵심 요소",
        "공허한 형용",
        "무엇이 어떻게 듣는지 쓴다",
    ),
    (
        r"깊이 파고들|들여다보|언어화|고민이 필요|짚고 넘어",
        "공허한 동사",
        "무엇을 썼는지 쓴다",
    ),
    (
        r"매우|극히|대단히|굉장히|상당히|무척",
        "알맹이 없는 강조",
        "수치·조건을 쓴다",
    ),
)


def new_text(payload: dict) -> str:
    """그 툴 호출로 쓴 텍스트만 꺼낸다."""
    ti = payload.get("tool_input") or {}
    parts: list[str] = []
    for key in ("content", "new_string"):
        value = ti.get(key)
        if isinstance(value, str):
            parts.append(value)
    edits = ti.get("edits")
    if isinstance(edits, list):
        for edit in edits:
            if isinstance(edit, dict) and isinstance(edit.get("new_string"), str):
                parts.append(edit["new_string"])
    return "\n".join(parts)


def target_lines(text: str) -> list[str]:
    """검사 대상 행을 돌려준다(코드블록·인용행·제목·HTML 코멘트를 뺀다)."""
    text = HTML_COMMENT.sub("", text)
    lines: list[str] = []
    in_fence = False
    for raw in text.splitlines():
        if FENCE.match(raw):
            in_fence = not in_fence
            continue
        if in_fence:
            continue
        stripped = raw.strip()
        if not stripped or stripped.startswith(">") or stripped.startswith("#"):
            continue
        lines.append(stripped)
    return lines


def plain(line: str) -> str:
    """링크 기법·인라인 코드·강조를 뺀 본문을 돌려준다."""
    return EMPHASIS.sub("", INLINE_CODE.sub("", LINK.sub(r"\1", line)))


def excerpt(line: str, around: str = "", width: int = 44) -> str:
    body = line if len(line) <= width else line[:width] + "…"
    if around and around in line and len(line) > width:
        start = max(line.index(around) - 12, 0)
        body = ("…" if start else "") + line[start : start + width] + "…"
    return body


def findings(text: str) -> list[str]:
    out: list[str] = []
    for line in target_lines(text):
        body = plain(line)
        for pattern, group, instead in AMBIGUOUS:
            hit = re.search(pattern, body)
            if hit:
                out.append(
                    f"[{group}] 「{hit.group(0)}」→ {instead}\n    {excerpt(body, hit.group(0))}"
                )
        if line.startswith("|"):
            continue  # 표의 행은 문장의 단위가 아니므로 문장 길이를 보지 않는다
        for sentence in SENT_SPLIT.split(body):
            sentence = sentence.strip()
            if len(sentence) > SENTENCE_LIMIT:
                out.append(
                    f"[긴 문장] {len(sentence)}자 → {SENTENCE_LIMIT}자 이내로 나눈다\n"
                    f"    {excerpt(sentence)}"
                )
    return out


def target_path(payload: dict) -> str | None:
    """검사 대상이면 file_path 를, 대상 밖이면 None 을 돌려준다."""
    path = (payload.get("tool_input") or {}).get("file_path")
    if not isinstance(path, str) or not path.endswith(".md"):
        return None
    if path.endswith(EXEMPT_SUFFIXES) or any(d in path for d in EXEMPT_DIRS):
        return None
    return path


def main() -> int:
    try:
        payload = json.load(sys.stdin)
    except Exception:
        return 0
    if not isinstance(payload, dict):
        return 0
    path = target_path(payload)
    if path is None:
        return 0
    found = findings(new_text(payload))
    if not found:
        return 0
    shown = found[:MAX_FINDINGS]
    print(f"한국어 읽기 쉬움 규약에 걸리는 표현이 있습니다: {path}")
    for item in shown:
        print(f"  {item}")
    if len(found) > len(shown):
        print(f"  (그 밖 {len(found) - len(shown)}건)")
    print(
        "고쳐 쓰십시오. 인용·원문 전재 등 적용 밖이면 "
        "고치지 않는 이유를 사람에게 전하십시오. "
        "규약: docs/guidelines/korean-writing-rules.md"
    )
    return 1


if __name__ == "__main__":
    sys.exit(main())
