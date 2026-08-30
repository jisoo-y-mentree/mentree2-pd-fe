#!/usr/bin/env bash
# check-merge-conflict.sh の回帰テスト。
#
# 実行: bash .claude/hooks/check-merge-conflict.test.sh
#
# 期待の読み方: warn = exit 2 で stderr に「コンフリクト検出」がある ／
# silent = それ以外（何も出さない）。
#
# 各ケースは使い捨てのローカルリポジトリを作る（ネットワークは使わない。
# origin はローカルの bare リポジトリで、既定ブランチは main）。

set -u
HOOK="$(cd "$(dirname "$0")" && pwd)/check-merge-conflict.sh"

pass=0
fail=0
tmproot=$(mktemp -d)
trap 'rm -rf "$tmproot"' EXIT

# $1: リポジトリ名, $2: conflict|clean, $3: sethead|nohead（省略時 sethead）
# origin/main を分岐後に進め、作業ブランチ work と衝突する／しない状態を作る。
# nohead は refs/remotes/origin/HEAD が無い状態（本リポジトリのクローンの実態）を再現する。
make_repo() {
  local name="$1" kind="$2" head_mode="${3:-sethead}"
  local origin="$tmproot/$name.git" work="$tmproot/$name"

  git init --quiet --bare --initial-branch=main "$origin"
  git init --quiet --initial-branch=main "$work"
  git -C "$work" config user.email t@example.com
  git -C "$work" config user.name test
  printf 'base\n' > "$work/f.txt"
  git -C "$work" add f.txt
  git -C "$work" commit --quiet -m base
  git -C "$work" remote add origin "$origin"
  git -C "$work" push --quiet origin main
  # sethead: 既定ブランチの解決を環境の init.defaultBranch に依存させない（clone と同じ状態）
  # nohead : origin/HEAD を作らない。フォールバックの末端（ハードコードの main）を通す
  #          （本リポジトリのクローンがこの状態。呼び出し側で global/system config を外す）
  if [ "$head_mode" = sethead ]; then
    git -C "$work" remote set-head origin main
  fi

  git -C "$work" switch --quiet -c work
  printf 'from-branch\n' > "$work/f.txt"
  git -C "$work" commit --quiet -am branch-change

  # origin 側の main を1コミット進める（conflict のときだけ同じ行を触る）
  git -C "$work" switch --quiet main
  if [ "$kind" = conflict ]; then
    printf 'from-main\n' > "$work/f.txt"
    git -C "$work" commit --quiet -am main-change
  else
    printf 'other\n' > "$work/other.txt"
    git -C "$work" add other.txt
    git -C "$work" commit --quiet -m main-change
  fi
  git -C "$work" push --quiet origin main
  git -C "$work" reset --hard --quiet HEAD~1     # ローカル main は分岐前へ戻す
  git -C "$work" switch --quiet work

  printf '%s' "$work"
}

# フック起動時に足す環境変数（既定は無し）。origin/HEAD 無しのケースで使う。
HOOK_ENV=""

# $1: 期待（warn|silent）, $2: ラベル, $3: command, $4: cwd
t() {
  local expect="$1" label="$2" cmd="$3" dir="$4" got err code json
  json=$(printf '%s\n%s' "$cmd" "$dir" | python3 -c '
import json, sys
lines = sys.stdin.read().split("\n")
print(json.dumps({
    "session_id": "test",
    "tool_name": "Bash",
    "cwd": lines[1],
    "tool_input": {"command": lines[0]},
}))')

  # shellcheck disable=SC2086 # HOOK_ENV は語に分割させる（空なら何も足さない）
  err=$(printf '%s' "$json" | env $HOOK_ENV "$HOOK" 2>&1 >/dev/null)
  code=$?
  if [ "$code" -eq 2 ] && printf '%s' "$err" | grep -q 'コンフリクト検出'; then
    got=warn
  else
    got=silent
  fi

  if [ "$got" = "$expect" ]; then
    printf '  ✅ %-6s %s\n' "$got" "$label"
    pass=$((pass + 1))
  else
    printf '  ❌ %-6s (期待:%s) %s\n' "$got" "$expect" "$label"
    printf '     stderr: %s\n' "$err"
    fail=$((fail + 1))
  fi
}

conflict_repo=$(make_repo conflict conflict)
clean_repo=$(make_repo clean clean)
nohead_repo=$(make_repo nohead conflict nohead)

echo "=== 衝突しているブランチの push は知らせる ==="
t warn 'push（cwd がリポジトリ）' 'git push -u origin work' "$conflict_repo"
t warn 'cd <repo> の後の push' "cd $conflict_repo && git push -u origin work" "$tmproot"
t warn 'git -C <repo> の push' "git -C $conflict_repo push -u origin work" "$tmproot"

echo
echo "=== 衝突していないブランチの push は沈黙する ==="
t silent '衝突なしの push' 'git push -u origin work' "$clean_repo"

echo
echo "=== origin/HEAD が無いクローンでも既定ブランチを解決する（フォールバックの末端） ==="
# global/system の init.defaultBranch を外し、ハードコードの main まで落ちる経路を通す
HOOK_ENV="GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_SYSTEM=/dev/null"
t warn 'origin/HEAD 無し・init.defaultBranch 無し' 'git push -u origin work' "$nohead_repo"
HOOK_ENV=""

echo
echo "=== push 以外・判定材料が無い入力は沈黙する ==="
t silent 'git status（push でない）' 'git status' "$conflict_repo"
t silent '後方に push の語が無い' 'gh pr create --base main' "$conflict_repo"
t silent '先頭語が git でない（文中の言及）' 'echo do not git push yet' "$conflict_repo"
t silent 'リポジトリ外の cwd' 'git push -u origin work' "$tmproot"
t silent '存在しないディレクトリ' "git -C $tmproot/nope push -u origin work" "$tmproot"

echo
echo "=== 既定ブランチ上の push は対象外（guard-git.sh の担当） ==="
git -C "$conflict_repo" switch --quiet main
t silent 'main 上での push' 'git push -u origin main' "$conflict_repo"
git -C "$conflict_repo" switch --quiet work

echo
echo "=== 通知の本文（衝突ファイルの一覧・解消手順）が出ている ==="
body=$(printf '{"tool_name":"Bash","cwd":"%s","tool_input":{"command":"git push -u origin work"}}' \
  "$conflict_repo" | "$HOOK" 2>&1 >/dev/null)
if printf '%s' "$body" | grep -q '^  - f\.txt$' \
  && printf '%s' "$body" | grep -q 'merge origin/main' \
  && printf '%s' "$body" | grep -q 'self-review-workflow.md §1.1'; then
  echo "  ✅ 衝突ファイル名・解消手順・手順書への参照が本文にある"
  pass=$((pass + 1))
else
  echo "  ❌ 本文が期待の形になっていない"
  printf '%s\n' "$body" | sed 's/^/     /'
  fail=$((fail + 1))
fi

echo
echo "=== 壊れた入力は沈黙する ==="
if printf 'not json' | "$HOOK" >/dev/null 2>&1; then
  echo "  ✅ silent (JSONでない入力)"
  pass=$((pass + 1))
else
  echo "  ❌ 壊れた入力で非0終了した"
  fail=$((fail + 1))
fi

echo
echo "成功 $pass ／ 失敗 $fail"
[ "$fail" -eq 0 ]
