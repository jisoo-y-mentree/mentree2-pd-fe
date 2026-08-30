#!/usr/bin/env bash
# guard-git.sh の回帰テスト（PD-47・2026-08-01）。
#
# 実行: bash .claude/hooks/guard-git.test.sh
#
# 注意: 本スクリプトは「git push」と既定ブランチ名を含む文字列を扱うため、
# 中身をBashツールのコマンドラインへ直接書くと guard-git.sh 自身にブロックされる。
# 必ずファイルとして実行すること（それ自体が旧実装の誤検知の実演でもあった）。

set -u
HOOK="$(cd "$(dirname "$0")" && pwd)/guard-git.sh"

pass=0
fail=0

# $1: 期待（block|allow）, $2: コマンド文字列
t() {
  local expect="$1" cmd="$2" got json
  json=$(printf '%s' "$cmd" | python3 -c '
import json, sys
print(json.dumps({"tool_input": {"command": sys.stdin.read()}}))')

  if printf '%s' "$json" | "$HOOK" >/dev/null 2>&1; then
    got=allow
  else
    got=block
  fi

  if [ "$got" = "$expect" ]; then
    printf '  ✅ %-5s %s\n' "$got" "$cmd"
    pass=$((pass + 1))
  else
    printf '  ❌ %-5s (期待:%s) %s\n' "$got" "$expect" "$cmd"
    fail=$((fail + 1))
  fi
}

default_branch=$(git symbolic-ref --short refs/remotes/origin/HEAD 2>/dev/null | sed 's#^origin/##')
current_branch=$(git symbolic-ref --short HEAD 2>/dev/null)
echo "既定ブランチ: ${default_branch:-（解決できず）}"
echo "現在ブランチ: ${current_branch:-（解決できず）}"
echo

echo "=== ブロックすべき（既定ブランチへ届く） ==="
t block 'git push -u origin main'
t block 'git push origin HEAD:main'
t block 'git push origin refs/heads/main'
t block 'git add -A && git commit -m x && git push origin main'

echo
echo "=== 許可すべき（ブランチへの push）— 旧実装が誤ブロックしていたもの ==="
t allow 'git push -u origin feat/domain-model'
t allow 'git push -u origin docs/maintenance-notes'
t allow 'git push -u origin fix/remaining-items'
t allow 'git push -u origin my-branch && gh pr create --base main'

echo
echo "=== 許可すべき（その他） ==="
t allow 'git add -A && git commit -m x && git push -u origin my-branch'
t allow 'gh pr create --base main --head my-branch'
t allow 'git log --oneline main..HEAD'
t allow 'git status --short'

echo
echo "=== cd で worktree へ移ってから push（2026-08-01 の誤検知） ==="
# フック自身の cwd は \$CLAUDE_PROJECT_DIR（primary worktree＝既定ブランチ）だが、
# 実際に push されるのは cd 先の worktree のブランチ。cd を解釈しないと誤ブロックする。
wt_other=$(git worktree list --porcelain | awk -v db="$default_branch" '
  /^worktree /{p=$2}
  /^branch /{b=$2; sub("refs/heads/","",b); if (b != db) {print p; exit}}')
if [ -n "$wt_other" ]; then
  echo "  （検証に使う worktree: ${wt_other}）"
  t allow "cd $wt_other && git push origin HEAD"
  t allow "cd $wt_other && git push"
  t allow "git -C $wt_other push origin HEAD"
else
  echo "  ⏭ 既定ブランチ以外の worktree が無いためスキップ"
fi
# 逆に、cd 先が既定ブランチの worktree なら従来どおりブロックされること（穴を作っていない確認）
wt_default=$(git worktree list --porcelain | awk -v db="$default_branch" '
  /^worktree /{p=$2}
  /^branch /{b=$2; sub("refs/heads/","",b); if (b == db) {print p; exit}}')
if [ -n "$wt_default" ]; then
  t block "cd $wt_default && git push origin HEAD"
  t block "cd $wt_default && git push"
fi
# 存在しないディレクトリへの cd は判定材料が無いので許可側に倒す（誤ブロックしない）
t allow 'cd /nonexistent-dir && git push origin HEAD'

echo
echo "=== refspec 省略（現在のブランチに依存）— 旧実装が素通りさせていたもの ==="
if [ "$current_branch" = "$default_branch" ]; then
  echo "  （既定ブランチ上で実行中）"
  t block 'git push'
  t block 'git push origin HEAD'
else
  echo "  （$current_branch 上で実行中 → 許可されるのが正）"
  t allow 'git push'
  t allow 'git push origin HEAD'
  echo "  ※ ブロック側の確認は既定ブランチをチェックアウトした状態で本テストを実行する"
fi

echo
echo "=== ブロックすべき（api.github.com を直接叩く） ==="
t block 'curl -s https://api.github.com/repos/o/r/pulls/1'
t block 'curl -sSL "https://api.github.com/repos/o/r/commits/$sha/check-runs" -H "Authorization: Bearer $GITHUB_TOKEN"'
t block '/usr/bin/curl -s https://api.github.com/rate_limit'
t block 'wget -qO- https://api.github.com/repos/o/r/pulls/1/files'
t block 'echo start && curl https://api.github.com/rate_limit'

echo
echo "=== 許可すべき（直接叩いていない） ==="
t allow 'gh api repos/o/r/pulls/1'
t allow 'gh pr checks 123'
t allow 'curl -sS "$HTTPS_PROXY/__agentproxy/status"'
t allow 'curl -s https://example.com/health'
t allow 'git log --oneline --grep api.github.com'

echo
printf '結果: %d passed, %d failed\n' "$pass" "$fail"
[ "$fail" -eq 0 ]
