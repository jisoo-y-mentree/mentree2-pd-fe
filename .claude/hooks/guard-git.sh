#!/usr/bin/env bash
# PreToolUse hook: デフォルトブランチへの直接pushと、api.github.com への直接アクセスをブロックする
# （ai-usage-rules.md ルール5・CLAUDE.md「Git」の機械的裏付け）
#
# stdinにJSON（tool_input.command等）が渡される。exit 2でツール実行をブロックし、
# stderrがClaudeに伝わる。
#
# 位置づけ: GitHub側のルールセット「protect main branch」（2026-08-01 有効化）が
# サーバ側の本丸で、本フックは「pushを実行する前に手元で気づく」ための多層防御。
# サーバ側だけだと拒否される時点でコミットもコマンドも走り切っており気づくのが遅い。
#
# 判定（PD-47・2026-08-01 精密化）:
#   git push [<remote>] [<refspec>...]
#     refspec あり → コロン右辺（無ければ全体）が既定ブランチと一致するか
#     refspec なし → 現在のブランチが既定ブランチと一致するか
#
# 旧実装は `*"git push"*main*` というグロブの共起で判定していたため3つの問題があった。
#   - `feat/domain-model` など単語の一部（do-main）に反応して誤ブロック
#   - `&& gh pr create --base main` のように後方の言及だけで誤ブロック
#   - `git push` 単体・`git push origin HEAD` は文字列に main が出ないため素通り
#     （＝本来止めるべき最も典型的なケースを見逃していた）
#
# テスト: .claude/hooks/guard-git.test.sh

set -u

input=$(cat)

# JSON を正しくパースする（旧実装の sed は貪欲マッチで他フィールドを巻き込んでいた）
command=$(printf '%s' "$input" | python3 -c '
import json, sys
try:
    d = json.load(sys.stdin)
except Exception:
    sys.exit(0)
print(d.get("tool_input", {}).get("command", ""))
' 2>/dev/null) || exit 0

[ -n "$command" ] || exit 0

# 指定ディレクトリでの HEAD（現在のブランチ名）を解決する。
# 空文字ならフック自身の cwd。ディレクトリが存在しなければ空を返す（＝判定材料なしで許可側）。
resolve_head() {
  if [ -n "${1:-}" ]; then
    [ -d "$1" ] || return 0
    git -C "$1" symbolic-ref --short HEAD 2>/dev/null || true
  else
    git symbolic-ref --short HEAD 2>/dev/null || true
  fi
}

# 既定ブランチ名を解決する（ハードコードしない）。リポジトリ横断で同一のため cwd で足りる。
default_branch=$(git symbolic-ref --short refs/remotes/origin/HEAD 2>/dev/null | sed 's#^origin/##')
[ -n "$default_branch" ] || default_branch=$(git config --get init.defaultBranch 2>/dev/null)
[ -n "$default_branch" ] || default_branch=main

# シェル行を区切り（&& || ; |）で分割し、git push のセグメントだけを対象にする
segments=$(printf '%s' "$command" | sed 's/&&/\n/g; s/||/\n/g; s/;/\n/g; s/|/\n/g')

# --- api.github.com を curl / wget で直接叩く経路をブロックする ---------------
# クラウドセッションはプロキシが api.github.com を止めるため必ず失敗する
# （環境変数に GITHUB_TOKEN があっても403）。CIの結果・PRの状態は
# MCP pull_request_read で取り、MCPが無いローカルは gh を使う
# （docs/guidelines/self-review-workflow.md §1.2）。
#
# 判定: セグメントに api.github.com を含み、かつ curl / wget が「語」として
# 現れる場合だけブロックする。`gh api ...` と、別ホストへの curl は対象外。
#
# 検出しないもの（静的解析の限界。本フックは多層防御で、抜け道の網羅は目的ではない）:
#   ①`sh -c "curl https://api.github.com/..."` のように引用符の内側へ入った形
#   ②URL・ホスト名を変数へ入れた形 ③curl / wget 以外のHTTPクライアント。
#   引用符を剥がす判定にしないのは、`grep -rn "curl .*api.github.com" docs/` を
#   誤ブロックするため。
#
# CI以外の用途（リリース情報の取得等）も止まる。パスで選り分けないのは、部分一致の
# 判定が誤ブロックと見逃しの両方を増やすため（本ファイル冒頭の 2026-08-01 の型）。
# 代替は下のブロックメッセージが案内する。git の取得系（clone・fetch・pull・
# ls-remote・submodule）と gh、github.com・raw.githubusercontent.com・
# codeload.github.com は対象外（実測で確認済み）。
api_direct=0
while IFS= read -r seg; do
  case "$seg" in
    *api.github.com*) : ;;
    *) continue ;;
  esac
  if printf '%s' "$seg" | awk '
      {
        for (i = 1; i <= NF; i++) {
          w = $i
          sub(/^.*\//, "", w)
          if (w == "curl" || w == "wget") found = 1
        }
      }
      END { exit found ? 0 : 1 }'; then
    api_direct=1
  fi
done <<EOF
$segments
EOF

if [ "$api_direct" -eq 1 ]; then
  cat >&2 <<MSG
ブロック: api.github.com を curl / wget で直接叩くことは禁止です。
クラウドセッションはプロキシが止めます（GITHUB_TOKEN があっても403）。
CIの結果・PRの状態は MCP pull_request_read（get_check_runs / get）で取ります。
MCP が無いローカルは gh を使います（gh pr checks / gh run view）。
リリース情報・アーカイブの取得は gh api / gh release download、または
github.com/<owner>/<repo>/archive/ ・ codeload.github.com を使います。
取り方の正: docs/guidelines/self-review-workflow.md §1.2
MSG
  exit 2
fi

blocked=0
reason=""

# 実効的な作業ディレクトリ。`cd <path> && git push ...` の形に追随する。
# フック自身の cwd は $CLAUDE_PROJECT_DIR（＝primary worktree）であり、
# worktree で作業していても main と判定してしまうため（2026-08-01 の誤検知）。
workdir=""

while IFS= read -r seg; do
  # `cd <path>` を見つけたら以降の実効ディレクトリを更新する
  case " $seg " in
    *" cd "*)
      cd_target=$(printf '%s' "$seg" | awk '
        BEGIN { seen = 0 }
        {
          for (i = 1; i <= NF; i++) {
            if ($i == "cd") { seen = 1; continue }
            if (!seen) continue
            if (substr($i, 1, 1) == "-") continue
            gsub(/^["'"'"']|["'"'"']$/, "", $i)
            print $i
            exit
          }
        }')
      [ -n "$cd_target" ] && workdir="$cd_target"
      ;;
  esac

  # このセグメントが git push か（語として判定する）
  # 1つ目: `git push ...` / 2つ目: `git -C <path> push ...` のような形
  case " $seg " in
    *" git push "*) : ;;
    *" git "*" push "*) : ;;
    *) continue ;;
  esac

  # `git -C <path> push` は -C の値を優先する
  c_target=$(printf '%s' "$seg" | awk '
    { for (i = 1; i < NF; i++) if ($i == "-C") { print $(i+1); exit } }')
  seg_workdir="${c_target:-$workdir}"

  # git push 以降の「オプションでない語」を集める。
  # 1つ目 = remote、2つ目以降 = refspec とみなす（git の通常形）。
  refspecs=$(printf '%s' "$seg" | awk '
    BEGIN { seen_push = 0; n = 0 }
    {
      for (i = 1; i <= NF; i++) {
        if ($i == "push") { seen_push = 1; continue }
        if (!seen_push) continue
        if (substr($i, 1, 1) == "-") continue          # オプションは飛ばす
        n++
        if (n > 1) print $i                            # 1つ目(remote)を除いた残り
      }
    }')

  if [ -z "$refspecs" ]; then
    # refspec 省略 → 現在のブランチが押し出される
    current=$(resolve_head "$seg_workdir")
    if [ "$current" = "$default_branch" ]; then
      blocked=1
      reason="現在のブランチが $default_branch です（refspec 省略のため $default_branch が push されます）"
    fi
  else
    while IFS= read -r spec; do
      [ -n "$spec" ] || continue
      # HEAD:main のような形は右辺、src だけなら全体。+ や refs/heads/ は剥がす
      dst=${spec##*:}
      dst=${dst#+}
      dst=${dst#refs/heads/}
      # `git push origin HEAD` は現在のブランチへの push
      if [ "$dst" = "HEAD" ]; then
        dst=$(resolve_head "$seg_workdir")
      fi
      if [ -n "$dst" ] && [ "$dst" = "$default_branch" ]; then
        blocked=1
        reason="push 先が $default_branch です（${spec}）"
      fi
    done <<EOF
$refspecs
EOF
  fi
done <<EOF
$segments
EOF

if [ "$blocked" -eq 1 ]; then
  cat >&2 <<MSG
ブロック: $default_branch への直接 push は禁止です。$reason
ブランチを切って PR を作成してください（CLAUDE.md「Git」／ai-usage-rules.md 5）。
ブランチ作成は worktrunk を使います: wt switch --create <branch> --no-cd --format=json
GitHub 側のルールセット「protect main branch」でもサーバ側で拒否されます。
MSG
  exit 2
fi

exit 0
