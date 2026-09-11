#!/usr/bin/env python3
"""문서의 기계적 정합성을 검사한다(CI 의 checks 잡에서 부른다).

검사하는 것은 5가지뿐이다. **사람이 눈으로 못 잡는 것만** 넣는다.
  ① 해결되지 않은 충돌 마커
  ② 리포 안 링크의 끊김
  ③ `DS-nn`·`P-nn` 의 중복과 형식
  ④ UI-SPEC 상태欄의 어휘
  ⑤ 용어집이 버린 말

⑤ 의 규칙은 코드에 없다. **용어집의 「쓰지 않는 말」 표가 정본**이고 이 파일은 그것을
읽기만 한다. 말을 더할 때 이 파일을 고치지 않는다.

의미 판단(규칙이 타당한가·문장이 좋은가)은 넣지 않는다. 그것은 `/pr-review` 의 일이다.

출처: DataSpace-v2 `scripts/check-docs.py`. 규모에서 나온 검사(ADR 색인·아키텍처
상태·spec 진행기록·채번 해시)는 가져오지 않았다.
"""

# 어노테이션을 지연 평가시킨다(문자열로 둔다). macOS 시스템 파이썬은 3.9 이고,
# `str | None`(PEP 604)은 3.10 부터라 def 시점에 TypeError 로 죽는다.
# CI 는 3.12 라 안 잡힌다 — 로컬에서만 터지는 종류다.
from __future__ import annotations

import os
import re
import sys

# `_import` 는 커밋하지 않는 반입 자리다. 우리가 고칠 수 없는 파일이므로 검사하지 않는다.
SKIP_DIRS = {
    ".git", "node_modules", "storybook-static", ".next", "dist", "build",
    "_import",
}

CONFLICT = re.compile(r"^(<{7}|={7}|>{7})(\s|$)")
# 마크다운 링크 중 리포 안을 가리키는 것만 본다(http·mailto·앵커만인 것은 제외).
LINK = re.compile(r"\[[^\]]*\]\(([^)]+)\)")
DS_ID = re.compile(r"^\|\s*(DS-\d+)\s*\|")
P_ID = re.compile(r"^\|\s*(P-\d+)\s*\|")
STATE = re.compile(r"^-\s*상태:\s*(.+)$")

UI_SPEC_STATES = {"기안", "UX승인", "확정", "구현인계"}

# 용어집의 「쓰지 않는 말」 표. 규칙은 저 문서가 갖고 여기는 읽기만 한다.
GLOSSARY = os.path.join("docs", "glossary", "ubiquitous-language.md")
BANNED_HEADING = "## 쓰지 않는 말"
BANNED_ROW = re.compile(r"^\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|\s*([^|]*?)\s*\|\s*$")
# 표의 머리와 구분선은 행이 아니다.
BANNED_SKIP = {"쓰지 않는 말", "판정 조건", "어디", "무엇"}
# 사본과 반입 자리는 우리가 고치지 않는다. 용어집 자신은 버린 말을 적는 곳이다.
BANNED_EXEMPT = (
    os.path.join("design", "ds-export") + os.sep,
    os.path.join("design", "_import") + os.sep,
)
# 백틱 안은 「그 말을 쓰는 것」이 아니라 「그 말을 가리키는 것」이다. 검사하지 않는다.
INLINE_CODE = re.compile(r"`[^`]*`")

problems: list[str] = []
warnings: list[str] = []


def markdown_files(root: str) -> list[str]:
    out = []
    for dirpath, dirnames, filenames in os.walk(root):
        dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS]
        for name in filenames:
            if name.endswith(".md"):
                out.append(os.path.join(dirpath, name))
    return sorted(out)


def read(path: str) -> str | None:
    try:
        with open(path, encoding="utf-8") as f:
            return f.read()
    except Exception:
        return None


def check_conflict_markers(root: str, files: list[str]) -> None:
    """충돌 마커가 남은 채 머지되는 것을 막는다."""
    for path in files:
        text = read(path)
        if text is None:
            continue
        in_fence = False
        for i, line in enumerate(text.splitlines(), 1):
            if line.lstrip().startswith(("```", "~~~")):
                in_fence = not in_fence
                continue
            if in_fence:
                continue
            if CONFLICT.match(line):
                rel = os.path.relpath(path, root)
                problems.append(f"{rel}:{i} 충돌 마커가 남아 있다: {line[:20]}")


def check_links(root: str, files: list[str]) -> None:
    """리포 안을 가리키는 상대 링크가 실재하는지 본다."""
    for path in files:
        text = read(path)
        if text is None:
            continue
        base = os.path.dirname(path)
        for i, line in enumerate(text.splitlines(), 1):
            for target in LINK.findall(line):
                target = target.strip()
                if not target or target.startswith(("http://", "https://", "mailto:", "#")):
                    continue
                # 템플릿 표기(<...>)는 실파일을 가리키지 않는다
                if "<" in target or ">" in target:
                    continue
                target = target.split("#", 1)[0]
                if not target:
                    continue
                resolved = os.path.normpath(os.path.join(base, target))
                if not os.path.exists(resolved):
                    rel = os.path.relpath(path, root)
                    problems.append(f"{rel}:{i} 링크가 끊겼다: {target}")


def check_ids(root: str) -> None:
    """`DS-nn`·`P-nn` 의 중복을 잡는다. 재사용하지 않는 것이 규칙이다."""
    for rel, pattern, label in (
        ("design/DS-update-list.md", DS_ID, "DS"),
        ("design/UX-PATTERNS.md", P_ID, "P"),
    ):
        path = os.path.join(root, rel)
        text = read(path)
        if text is None:
            continue
        seen: dict[str, int] = {}
        for i, line in enumerate(text.splitlines(), 1):
            m = pattern.match(line)
            if not m:
                continue
            ident = m.group(1)
            if ident in seen:
                problems.append(f"{rel}:{i} {label} ID 가 중복됐다: {ident} (앞: {seen[ident]}행)")
            else:
                seen[ident] = i


def check_ui_spec_states(root: str) -> None:
    """UI-SPEC 의 상태欄이 정해진 어휘인지 본다."""
    screens = os.path.join(root, "design", "screens")
    if not os.path.isdir(screens):
        return
    for entry in sorted(os.listdir(screens)):
        path = os.path.join(screens, entry, "UI-SPEC.md")
        text = read(path)
        if text is None:
            continue
        rel = os.path.relpath(path, root)
        found = False
        for i, line in enumerate(text.splitlines(), 1):
            m = STATE.match(line.strip())
            if not m:
                continue
            found = True
            # 「기안 | UX승인 | …」 형태의 템플릿 그대로면 아직 안 정한 것이다
            value = m.group(1).strip()
            if "|" in value:
                warnings.append(f"{rel}:{i} 상태欄이 템플릿 그대로다")
                break
            head = value.split()[0].strip("*`")
            if head not in UI_SPEC_STATES:
                allowed = " / ".join(sorted(UI_SPEC_STATES))
                problems.append(f"{rel}:{i} 상태欄의 어휘가 아니다: {head} (허용: {allowed})")
            break
        if not found:
            problems.append(f"{rel} 상태欄이 없다")
        # template/SOURCE.md 의 존재를 본다
        tmpl = os.path.join(screens, entry, "template")
        if os.path.isdir(tmpl) and not os.path.exists(os.path.join(tmpl, "SOURCE.md")):
            problems.append(f"design/screens/{entry}/template/ 에 SOURCE.md 가 없다")


def load_banned_terms(root: str) -> list[tuple[str, str]]:
    """용어집의 「쓰지 않는 말」 표를 읽는다. 표가 없으면 검사를 하지 않는다."""
    text = read(os.path.join(root, GLOSSARY))
    if text is None:
        return []
    pairs: list[tuple[str, str]] = []
    inside = False
    for line in text.splitlines():
        if line.startswith("## "):
            # 다른 2단 제목이 나오면 절이 끝난 것이다
            inside = line.strip() == BANNED_HEADING
            continue
        if not inside or not line.startswith("|"):
            continue
        m = BANNED_ROW.match(line)
        if not m:
            continue
        banned, instead = m.group(1).strip(), m.group(2).strip()
        # 구분선(|---|)과 표의 머리를 거른다
        if set(banned) <= set("-: ") or banned in BANNED_SKIP:
            continue
        if not banned or not instead:
            continue
        pairs.append((banned, instead))
    return pairs


def check_banned_terms(root: str, files: list[str]) -> None:
    """용어집이 버린 말이 남아 있는지 본다. 고치지는 않는다."""
    pairs = load_banned_terms(root)
    if not pairs:
        return
    for path in files:
        rel = os.path.relpath(path, root)
        if rel == GLOSSARY or rel.startswith(BANNED_EXEMPT):
            continue
        text = read(path)
        if text is None:
            continue
        in_fence = False
        for i, line in enumerate(text.splitlines(), 1):
            if line.lstrip().startswith(("```", "~~~")):
                in_fence = not in_fence
                continue
            if in_fence:
                continue
            # 백틱 안을 지운 뒤에 본다. 버린 말을 「가리키는」 문장을 잡지 않기 위해서다.
            bare = INLINE_CODE.sub("", line)
            for banned, instead in pairs:
                if banned in bare:
                    problems.append(
                        f"{rel}:{i} 쓰지 않는 말: 「{banned}」 → 「{instead}」"
                    )


def main() -> int:
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    files = markdown_files(root)

    check_conflict_markers(root, files)
    check_links(root, files)
    check_ids(root)
    check_ui_spec_states(root)
    check_banned_terms(root, files)

    for w in warnings:
        print(f"⚠️  {w}")
    if problems:
        for p in problems:
            print(f"❌ {p}")
        print(f"\n{len(problems)}건의 부정합이 있다.")
        return 1
    print(f"✅ 부정합 없다 (마크다운 {len(files)}본)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
