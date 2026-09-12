#!/usr/bin/env bash
# check-docs.py 의 자기검사. CI(checks 잡)에서 부른다.
#
# 핵심은 「쓰지 않는 말」이다. 규칙이 코드가 아니라 용어집의 표에 있으므로,
# 표를 고쳤을 때 검사기가 따라오는지를 여기서 지킨다.
#
# 리포 본체를 건드리지 않는다. 임시 디렉터리에 최소 리포를 만들어 돌린다.

set -u

here=$(cd "$(dirname "$0")" && pwd)
script="$here/check-docs.py"
pass=0
fail=0

work=$(mktemp -d)
trap 'rm -rf "$work"' EXIT

# 최소 리포를 만든다. $1 = 용어집의 「쓰지 않는 말」 표 본문, $2 = 검사 대상 문서의 내용
build() {
  rm -rf "$work/repo"
  mkdir -p "$work/repo/scripts" "$work/repo/docs/glossary" "$work/repo/design/docs"
  cp "$script" "$work/repo/scripts/check-docs.py"
  {
    printf '# 용어집\n\n## 쓰지 않는 말\n\n'
    printf '| 쓰지 않는 말 | 대신 쓸 말 | 왜 |\n|---|---|---|\n'
    printf '%s\n' "$1"
    printf '\n## 여기에 넣지 않은 것\n\n끝이다.\n'
  } > "$work/repo/docs/glossary/ubiquitous-language.md"
  printf '%s\n' "$2" > "$work/repo/design/docs/target.md"
}

# t <expect: hit|quiet> <표 본문> <대상 문서> <라벨>
t() {
  local expect="$1" table="$2" doc="$3" label="$4" out status
  build "$table" "$doc"
  out=$(python3 "$work/repo/scripts/check-docs.py" 2>&1)
  status=$?
  if [ "$expect" = "hit" ] && [ "$status" -eq 1 ]; then
    printf '  ✅ %s\n' "$label"; pass=$((pass + 1)); return
  fi
  if [ "$expect" = "quiet" ] && [ "$status" -eq 0 ]; then
    printf '  ✅ %s\n' "$label"; pass=$((pass + 1)); return
  fi
  printf '  ❌ %s (expect=%s status=%s)\n' "$label" "$expect" "$status"
  printf '     %s\n' "$(printf '%s' "$out" | head -1)"
  fail=$((fail + 1))
}

ROW='| 지역 | 국가 | 축은 국가 하나다 |'

echo "=== ①표를 읽어서 잡는다（이 검사의 핵심） ==="

t hit   "$ROW" '필터는 지역으로 좁힌다.'       '표에 있는 말을 쓰면 잡는다'
t quiet "$ROW" '필터는 국가로 좁힌다.'         '대신 쓸 말은 통과한다'

echo
echo "=== ②규칙의 정본은 표다. 코드가 아니다 ==="

t quiet '| 직종 | 직무 | 예시다 |' '필터는 지역으로 좁힌다.' \
  '표에서 뺀 말은 잡지 않는다'
t hit   '| 직종 | 직무 | 예시다 |' '직종으로 좁힌다.' \
  '표에 더한 말은 코드를 안 고쳐도 잡힌다'

echo
echo "=== ③가리키는 것과 쓰는 것을 가른다 ==="

t quiet "$ROW" '와이어의 `지역` 은 잘못된 단어다.' '백틱 안은 지나간다'
t quiet "$ROW" '```
지역
```' '코드블록 안은 지나간다'
t hit   "$ROW" '`국가` 가 맞다. 지역은 틀렸다.' '한 줄에 백틱과 맨몸이 섞이면 맨몸을 잡는다'

echo
echo "=== ④표가 없으면 검사하지 않는다 ==="

rm -rf "$work/repo"
mkdir -p "$work/repo/scripts" "$work/repo/docs/glossary" "$work/repo/design/docs"
cp "$script" "$work/repo/scripts/check-docs.py"
printf '# 용어집\n\n표가 없다.\n' > "$work/repo/docs/glossary/ubiquitous-language.md"
printf '지역으로 좁힌다.\n' > "$work/repo/design/docs/target.md"
if python3 "$work/repo/scripts/check-docs.py" > /dev/null 2>&1; then
  printf '  ✅ 표가 없으면 통과한다\n'; pass=$((pass + 1))
else
  printf '  ❌ 표가 없으면 통과한다\n'; fail=$((fail + 1))
fi

echo
echo "=== ⑤리포 본체가 통과한다 ==="

if python3 "$script" > /dev/null 2>&1; then
  printf '  ✅ 이 리포가 통과한다\n'; pass=$((pass + 1))
else
  printf '  ❌ 이 리포가 통과한다\n'; fail=$((fail + 1))
  python3 "$script" 2>&1 | head -5 | sed 's/^/     /'
fi

echo
printf '통과 %s / 실패 %s\n' "$pass" "$fail"
[ "$fail" -eq 0 ]
