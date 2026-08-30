#!/usr/bin/env bash
# PostToolUse hook: 마크다운을 쓴 직후에 애매어·LLM 말투·너무 긴 문장을 지적한다
# (규약의 정본은 docs/guidelines/korean-writing-rules.md. 판정은 check-korean.py).
#
# stdin 에 JSON(tool_input.file_path·content·new_string 등)이 온다. PostToolUse 이므로
# 쓰기 자체는 끝나 있고, exit 2 의 stderr 는 「Claude 로의 피드백」으로 전달된다
# (블록이 아니다). 검사하는 것은 그 툴 호출로 쓴 텍스트뿐이다.
#
# 테스트: .claude/hooks/check-korean.test.sh

set -u

here=$(cd "$(dirname "$0")" && pwd)
checker="$here/check-korean.py"
[ -f "$checker" ] || exit 0

input=$(cat)

# 판정은 Python 쪽. 지적이 있을 때만 exit 1 로 본문을 stdout 으로 낸다.
message=$(printf '%s' "$input" | python3 "$checker" 2>/dev/null)
status=$?

[ "$status" -eq 1 ] || exit 0
[ -n "$message" ] || exit 0

printf '%s\n' "$message" >&2
exit 2
