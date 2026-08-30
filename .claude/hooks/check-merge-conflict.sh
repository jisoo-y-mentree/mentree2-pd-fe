#!/usr/bin/env bash
# PostToolUse hook: git push の直後に、作業ブランチが既定ブランチと衝突していないかを
# 実測し、衝突していればその場でClaudeへ知らせる。
#
# なぜ必要か（この検出が無いと何が起きるか）:
#   .github/workflows/ci.yml のトリガーは `pull_request`（branches: [main] の push を除く）。
#   GitHub は衝突しているPRのマージref（refs/pull/<n>/merge）を作れないため、
#   衝突している間はチェックが1つも作られない。「CIの完了を待つ」（起票者レビューの手順3）
#   に入ったセッションは、永遠に来ないチェックを待ち続ける。
#   衝突は push の時点で手元のgitだけで判定できるので、待ちに入る前に検出して潰す。
#
# 判定: `git merge-tree --write-tree origin/<既定ブランチ> HEAD` の終了コード
#   0 → 衝突なし（何も出さない）／ 1 → 衝突あり（exit 2 でClaudeへ通知）
#   それ以外（gitが古い・refが無い等）→ 判定材料なしとして沈黙する
#
# 位置づけ: 本フックが押さえるのは push 直後の1点だけで、次の2つは押さえない。
#   - 待ちの最中に他PRのマージで発生した衝突
#   - base が既定ブランチでないPR（比較先は常に origin/<既定ブランチ> のため、
#     GitHub のマージ可否判定と食い違う。現行運用の base は常に既定ブランチ）
# いずれも docs/guidelines/self-review-workflow.md §1.1 の手順（待つ前・チェックが
# 増えないときの確認）が押さえる。
#
# テスト: .claude/hooks/check-merge-conflict.test.sh

set -u

input=$(cat)

parsed=$(printf '%s' "$input" | python3 -c '
import json, sys
try:
    d = json.load(sys.stdin)
except Exception:
    sys.exit(0)
print(d.get("tool_input", {}).get("command", "").replace("\n", " "))
print(d.get("cwd", ""))
' 2>/dev/null) || exit 0

command=$(printf '%s' "$parsed" | sed -n 1p)
cwd=$(printf '%s' "$parsed" | sed -n 2p)
[ -n "$command" ] || exit 0

# シェル行を区切りで分割し、git push のセグメントだけを対象にする（guard-git.sh と同じ判定）。
segments=$(printf '%s' "$command" | sed 's/&&/\n/g; s/||/\n/g; s/;/\n/g; s/|/\n/g')

workdir=""
pushed=0

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

  # セグメントの先頭語が git で、かつ push を語として含むものだけを対象にする。
  # 先頭語を見るのは `echo do not git push yet` のような言及を拾わないため
  # （guard-git.sh は語の共起で見ているが、あちらはブロックのため取りこぼしを許さない側に倒す）。
  case " $seg " in
    *" git "*" push "*) : ;;
    *" git push "*) : ;;
    *) continue ;;
  esac
  [ "$(printf '%s' "$seg" | awk '{print $1; exit}')" = "git" ] || continue

  pushed=1
  # `git -C <path> push` は -C の値を優先する
  c_target=$(printf '%s' "$seg" | awk '
    { for (i = 1; i < NF; i++) if ($i == "-C") { print $(i+1); exit } }')
  [ -n "$c_target" ] && workdir="$c_target"
done <<EOF
$segments
EOF

[ "$pushed" -eq 1 ] || exit 0

dir="${workdir:-$cwd}"
[ -n "$dir" ] || dir="."
[ -d "$dir" ] || exit 0

git -C "$dir" rev-parse --git-dir >/dev/null 2>&1 || exit 0

current=$(git -C "$dir" symbolic-ref --short HEAD 2>/dev/null) || exit 0
[ -n "$current" ] || exit 0

# 既定ブランチ名を解決する（ハードコードしない）
default_branch=$(git -C "$dir" symbolic-ref --short refs/remotes/origin/HEAD 2>/dev/null | sed 's#^origin/##')
[ -n "$default_branch" ] || default_branch=$(git -C "$dir" config --get init.defaultBranch 2>/dev/null)
[ -n "$default_branch" ] || default_branch=main

# 既定ブランチ上での push は本フックの対象外（guard-git.sh がPreToolUseで止めている）
[ "$current" = "$default_branch" ] && exit 0

# 判定は「今の origin/<既定ブランチ>」に対して行う。取得できなければ沈黙する
# （ネットワーク不通・認証切れを衝突と誤報しない）。
if command -v timeout >/dev/null 2>&1; then
  timeout 60 git -C "$dir" fetch --quiet origin "$default_branch" 2>/dev/null || exit 0
else
  git -C "$dir" fetch --quiet origin "$default_branch" 2>/dev/null || exit 0
fi

base="origin/$default_branch"
git -C "$dir" rev-parse --verify --quiet "$base" >/dev/null 2>&1 || exit 0

conflicts=$(git -C "$dir" merge-tree --write-tree --name-only "$base" HEAD 2>/dev/null)
status=$?

# 0 = 衝突なし、1 = 衝突あり、それ以外 = 判定できていない（古いgit等）
[ "$status" -eq 1 ] || exit 0

# --write-tree の出力は1行目がツリーのOID、以降が衝突ファイル名（--name-only）。
files=$(printf '%s\n' "$conflicts" | sed 1d | sed '/^$/,$d' | sed 's/^/  - /')

cat >&2 <<MSG
コンフリクト検出: ブランチ $current は $base と衝突しています。
$files
衝突している間はこのPRのCIチェックが1つも作られません（理由は本フック冒頭のコメントと
docs/guidelines/self-review-workflow.md §1.1）。CIの完了を待たないでください。

先に衝突を解消してから push し直してください:
  git -C $dir fetch origin $default_branch
  git -C $dir merge $base      # 衝突を解消して commit する
  git -C $dir push -u origin $current

手順の正: docs/guidelines/self-review-workflow.md §1.1（CIを待つ前の確認）
MSG
exit 2
