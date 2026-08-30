#!/usr/bin/env bash
# check-korean.sh / check-korean.py の自己検査。CI（checks ジョブ）から呼ばれる。
#
# 핵심은 「문장 분할」이다. 원본(일본어판)은 `。` 로만 잘라서 한국어 문서 전체가
# 1문으로 세어졌다. 그 회귀를 막는 것이 이 스위트의 최우선 목적이다.

set -u

here=$(cd "$(dirname "$0")" && pwd)
hook="$here/check-korean.sh"
pass=0
fail=0

# t <expect: hit|quiet> <file_path> <content> <label>
t() {
  local expect="$1" path="$2" content="$3" label="$4"
  local json out status
  json=$(python3 -c '
import json, sys
print(json.dumps({"tool_name": "Write",
                  "tool_input": {"file_path": sys.argv[1], "content": sys.argv[2]}}))
' "$path" "$content")
  out=$(printf '%s' "$json" | bash "$hook" 2>&1)
  status=$?
  if [ "$expect" = "hit" ] && [ "$status" -eq 2 ]; then
    printf '  ✅ %s\n' "$label"; pass=$((pass + 1)); return
  fi
  if [ "$expect" = "quiet" ] && [ "$status" -eq 0 ]; then
    printf '  ✅ %s\n' "$label"; pass=$((pass + 1)); return
  fi
  printf '  ❌ %s (expect=%s status=%s)\n' "$label" "$expect" "$status"
  [ -n "$out" ] && printf '     %s\n' "$(printf '%s' "$out" | head -2 | tail -1)"
  fail=$((fail + 1))
}

echo "=== ①문장 분할（이 훅의 핵심。회귀하면 여기가 떨어진다） ==="

# 140자를 넘지 않는 문장 4개. 원본의 로직이면 통째로 1문＝560자로 세어 오탐한다.
FOUR="이것은 첫 번째 문장이다. 이것은 두 번째 문장이다. 이것은 세 번째 문장이다. 이것은 네 번째 문장이다."
t quiet doc.md "$FOUR" "마침표로 나뉜 짧은 문장 4개는 통과한다"

# 실제로 원본이 오탐한 문장（SETUP.md ③에서 재현）
REAL="별도 spec 층을 두지 않고 UI-SPEC을 spec으로 삼는다. DataSpace는 승인된 UoW를 입력으로 삼는다. UI-SPEC의 다섯 절이 요건 그 자체다. 3인 팀에서는 중복이다."
t quiet doc.md "$REAL" "원본이 197자로 오탐한 문장은 통과한다"

echo
echo "=== ②긴 문장의 검출 ==="

LONG=$(python3 -c 'print("가나다라마바사아자차카타파하 " * 12 + "이다.")')
t hit doc.md "$LONG" "140자를 넘는 1문은 잡는다"
t quiet doc.md "짧은 문장이다." "짧은 문장은 통과한다"

echo
echo "=== ③검사 대상 밖 ==="

t quiet doc.md '```
이것은 매우 중요한 코드블록이며 적절히 처리되어야 한다고 생각된다.
```' "코드블록 안은 보지 않는다"
t quiet doc.md '> 인용문에서는 적절히 라는 말이 나와도 된다.' "인용행은 보지 않는다"
t quiet doc.md '# 적절히 정리한다' "제목은 보지 않는다"
t quiet doc.md '<!-- 적절히 라는 말이 코멘트에 있다 -->' "HTML 코멘트는 보지 않는다"
t quiet doc.md '`적절히` 는 코드다.' "인라인 코드 안은 보지 않는다"
t quiet notes.txt '적절히 처리한다.' ".md 가 아니면 보지 않는다"
t quiet docs/guidelines/korean-writing-rules.md '적절히 처리한다.' "규약 그 자체는 제외한다"
t quiet docs/research/note.md '적절히 처리한다.' "docs/research/ 는 제외한다"

echo
echo "=== ④표의 행은 문장 길이를 보지 않는다 ==="

TABLEROW=$(python3 -c 'print("| " + "가나다라마바사아자차카타파하 " * 12 + " |")')
t quiet doc.md "$TABLEROW" "표의 행은 길어도 통과한다"

echo
echo "=== ⑤애매어·LLM 말투 ==="

t hit doc.md '이 방식이 더 나을 것이다.'          "추측"
t hit doc.md '깨질 가능성이 있다.'                "판단의 보류"
t hit doc.md '문제가 없지는 않다.'                "이중부정"
t hit doc.md '여백은 적절히 준다.'                "정도의 흐리기"
t hit doc.md '성능적인 부분을 개선한다.'          "추상명사"
t hit doc.md '버튼이라든지 링크를 고친다.'        "애매한 예시"
t hit doc.md '정리하자면 세 가지다.'              "예고와 총괄"
t hit doc.md '이것은 핵심적인 결정이다.'          "공허한 형용"
t hit doc.md '요구사항을 언어화한다.'             "공허한 동사"
t hit doc.md '이것은 매우 빠르다.'                "알맹이 없는 강조"

echo
echo "=== ⑥오탐하지 않는다（일부러 뺀 말） ==="

t quiet doc.md '테스트가 잘 돈다.'                "「잘」은 잡지 않는다"
t quiet doc.md '제대로 동작한다.'                 "「제대로」는 잡지 않는다"
t quiet doc.md '반드시 질문한다.'                 "「반드시」는 잡지 않는다"
t quiet doc.md '구현 관점에서 본다.'              "「관점」은 잡지 않는다"
t quiet doc.md '아직 할 것이 많다.'               "「할 것이 많다」는 잡지 않는다"

echo
echo "=== ⑦깨진 입력은 침묵한다 ==="

out=$(printf 'not json' | bash "$hook" 2>&1); status=$?
if [ "$status" -eq 0 ]; then
  printf '  ✅ %s\n' "JSON 이 아닌 입력"; pass=$((pass + 1))
else
  printf '  ❌ %s (status=%s)\n' "JSON 이 아닌 입력" "$status"; fail=$((fail + 1))
fi

echo
echo "성공: $pass / 실패: $fail"
[ "$fail" -eq 0 ]
