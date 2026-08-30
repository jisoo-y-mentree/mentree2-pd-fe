#!/usr/bin/env bash
# guard-pr.sh の回帰テスト。
#
# 実行: bash .claude/hooks/guard-pr.test.sh
#
# 観点:
#   ①対象の判定（本文・タイトルを書く呼び出しだけを止める）
#   ②対象外（本文を書かない更新・読み取り・語が引数に現れるだけのコマンドを止めない）
#   ③痕跡の判定（/pr を通したセッションでは止めない）
#   ④誤検知（AI自身のコマンド文字列・tool_result・/pr-review を痕跡と誤認しない）
#   ⑤判定材料が無いとき（transcript が読めない環境では素通りする＝既知の穴）
#   ⑥配線（settings.json の matcher が実ツール名に当たる。本テストは hook を直接叩くため、
#     matcher が誤っていても①〜⑤は緑のままになる）
#   ⑦レビュアー設定の時期（Draft作成と同時の設定を止め、Ready化と同時の設定は通す）
#   ⑧Ready化時のBoltクローズ検査（チェックボックス全消化＋状態欄「実装中」のspecを差分に
#     持つブランチのReady化を止め、未チェックが残る形＝複数PR運用は通す）

set -u
HOOK="$(cd "$(dirname "$0")" && pwd)/guard-pr.sh"

pass=0
fail=0

tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT

# 既定の実行cwdはgitリポジトリ外に固定する。判定③がテスト実行時の実リポジトリの状態を
# 読んでしまうと、①②⑦の期待値が作業中のブランチ内容に依存して揺れるため。
mkdir -p "$tmp/nogit"
CWD="$tmp/nogit"

# transcript のフィクスチャを作る。$1: ファイル名, 残り: 種別キー
make_transcript() {
  local out="$tmp/$1"
  shift
  python3 - "$out" "$@" <<'PY'
import json, sys

out, kinds = sys.argv[1], sys.argv[2:]
SKILL_MD = "/home/user/DataSpace-v2/.claude/skills/pr/SKILL.md"

def user_text(text):
    return {"type": "user", "message": {"role": "user", "content": [{"type": "text", "text": text}]}}

def assistant_tool_use(name, inp):
    return {"type": "assistant", "message": {"role": "assistant",
            "content": [{"type": "tool_use", "id": "toolu_x", "name": name, "input": inp}]}}

entries = {
    # 素の作業（痕跡なし）
    "noise": [user_text("PRの本文を書いてください")],
    # /pr をスラッシュコマンドで起動した（コマンド行＋注入されたスキル本文）
    "slash": [
        {"type": "user", "message": {"role": "user",
         "content": "<command-message>pr</command-message>\n<command-name>/pr</command-name>"}},
        user_text("Base directory for this skill: /home/user/DataSpace-v2/.claude/skills/pr\n\n# PR本文の作成・更新"),
    ],
    # Skill ツールで起動した
    "skilltool": [assistant_tool_use("Skill", {"skill": "pr"})],
    # SKILL.md を Read で直接読んだ
    "read": [assistant_tool_use("Read", {"file_path": SKILL_MD})],
    # 誤検知源: AI自身のBashコマンド文字列と、その tool_result にスキル本文が現れる
    "grepnoise": [
        assistant_tool_use("Bash", {"command": "cat .claude/skills/pr/SKILL.md"}),
        {"type": "user", "message": {"role": "user", "content": [
            {"type": "tool_result", "tool_use_id": "toolu_x",
             "content": "Base directory for this skill: /home/user/DataSpace-v2/.claude/skills/pr\n# PR本文の作成・更新"}]}},
    ],
    # 誤検知源: AIが自分の回答文でスキルを説明した（/pr は通していない）
    "assistanttext": [
        {"type": "assistant", "message": {"role": "assistant", "content": [{"type": "text",
         "text": "guard-pr.sh は <command-name>/pr</command-name> や "
                 "Base directory for this skill: /home/user/DataSpace-v2/.claude/skills/pr を痕跡として見ます"}]}},
    ],
    # 誤検知源: サブエージェントの報告（task-notification）が痕跡文字列を引用した
    "tasknotification": [
        {"type": "user", "message": {"role": "user", "content":
         "<task-notification>サブエージェントの出力: Base directory for this skill: "
         "/home/user/DataSpace-v2/.claude/skills/pr … </task-notification>"}},
    ],
    # 誤検知源: /pr-review は /pr ではない
    "prreview": [
        {"type": "user", "message": {"role": "user",
         "content": "<command-name>/pr-review</command-name>"}},
        user_text("Base directory for this skill: /home/user/DataSpace-v2/.claude/skills/pr-review"),
        assistant_tool_use("Skill", {"skill": "pr-review"}),
    ],
}

with open(out, "w", encoding="utf-8") as f:
    for kind in kinds:
        for e in entries[kind]:
            f.write(json.dumps(e, ensure_ascii=False) + "\n")
PY
}

# $1: 期待（block|allow）, $2: transcript ファイル名（- で未指定）, $3: tool_name,
# $4: tool_input のJSON, $5: 説明
t() {
  local expect="$1" transcript="$2" tool="$3" tool_input="$4" label="$5" got json path
  if [ "$transcript" = "-" ]; then
    path=""
  else
    path="$tmp/$transcript"
  fi

  json=$(python3 -c '
import json, sys
print(json.dumps({
    "hook_event_name": "PreToolUse",
    "transcript_path": sys.argv[1],
    "tool_name": sys.argv[2],
    "tool_input": json.loads(sys.argv[3]),
}))' "$path" "$tool" "$tool_input")

  if (cd "$CWD" && printf '%s' "$json" | "$HOOK" >/dev/null 2>&1); then
    got=allow
  else
    got=block
  fi

  if [ "$got" = "$expect" ]; then
    printf '  ✅ %-5s %s\n' "$got" "$label"
    pass=$((pass + 1))
  else
    printf '  ❌ %-5s (期待:%s) %s\n' "$got" "$expect" "$label"
    fail=$((fail + 1))
  fi
}

make_transcript noise.jsonl noise
make_transcript slash.jsonl noise slash
make_transcript skilltool.jsonl noise skilltool
make_transcript read.jsonl noise read
make_transcript grepnoise.jsonl noise grepnoise
make_transcript prreview.jsonl noise prreview
make_transcript assistanttext.jsonl noise assistanttext
make_transcript tasknotification.jsonl noise tasknotification

PR_BODY='{"owner":"radarlab-inc","repo":"DataSpace-v2","pullNumber":1,"body":"## 概要\n…"}'
PR_TITLE='{"owner":"radarlab-inc","repo":"DataSpace-v2","pullNumber":1,"title":"process-99: 何か"}'
PR_META='{"owner":"radarlab-inc","repo":"DataSpace-v2","pullNumber":1,"reviewers":["hiyuzawa-radar-lab"],"draft":false}'
PR_CREATE='{"owner":"radarlab-inc","repo":"DataSpace-v2","title":"t","head":"h","base":"main","body":"b"}'
PR_CREATE_REVIEWER='{"owner":"radarlab-inc","repo":"DataSpace-v2","title":"t","head":"h","base":"main","body":"b","draft":true,"reviewers":["hiyuzawa-radar-lab"]}'
PR_REVIEWER_ONLY='{"owner":"radarlab-inc","repo":"DataSpace-v2","pullNumber":1,"reviewers":["hiyuzawa-radar-lab"]}'
PR_REVIEWER_DRAFT='{"owner":"radarlab-inc","repo":"DataSpace-v2","pullNumber":1,"reviewers":["hiyuzawa-radar-lab"],"draft":true}'

echo "=== ①ブロックすべき（/pr を通していない） ==="
t block noise.jsonl mcp__github__create_pull_request "$PR_CREATE" 'create_pull_request'
t block noise.jsonl mcp__github__update_pull_request "$PR_BODY" 'update_pull_request（body）'
t block noise.jsonl mcp__github__update_pull_request "$PR_TITLE" 'update_pull_request（title）'
t block noise.jsonl Bash '{"command":"gh pr create --draft --body-file /tmp/body.md"}' 'gh pr create'
t block noise.jsonl Bash '{"command":"gh pr edit 1 --body-file /tmp/body.md"}' 'gh pr edit --body-file'
t block noise.jsonl Bash '{"command":"gh pr edit 1 --title x"}' 'gh pr edit --title'
t block noise.jsonl Bash '{"command":"git add -A && gh pr create --fill"}' 'パイプ・&& の後ろの gh pr create'
t block noise.jsonl Bash '{"command":"gh pr edit 1 -b 本文"}' 'gh pr edit -b（短縮形）'
t block noise.jsonl Bash '{"command":"gh pr edit 1 -F /tmp/body.md"}' 'gh pr edit -F（短縮形）'
t block noise.jsonl Bash '{"command":"gh pr edit 1 -t タイトル"}' 'gh pr edit -t（短縮形）'
t block noise.jsonl Bash '{"command":"gh pr edit 1 --body=x"}' 'gh pr edit --body=（= 形式）'
t block noise.jsonl Bash '{"command":"echo x\ngh pr create --fill"}' '改行区切りの gh pr create'
t block noise.jsonl Bash '{"command":"BODY=/tmp/b.md gh pr create --body-file $BODY"}' '環境変数代入の後ろの gh pr create'
t block noise.jsonl Bash '{"command":"/usr/bin/gh pr create --fill"}' '絶対パスの gh'
t block noise.jsonl mcp__gh2__update_pull_request "$PR_BODY" '別名のGitHub系MCPサーバ'
t block noise.jsonl Bash '{"command":"gh pr edit 1 -b本文"}' 'gh pr edit -b（値が密着）'
t block noise.jsonl Bash '{"command":"timeout 60 gh pr create --fill"}' 'timeout 経由'
t block noise.jsonl Bash '{"command":"echo 1 | xargs gh pr edit 1 --body x"}' 'xargs 経由'
t block noise.jsonl Bash '{"command":"if gh pr create --fill; then echo ok; fi"}' 'if の直後'
t block noise.jsonl Bash '{"command":"gh pr edit 1 --body \"未閉じ"}' '引用が閉じていない（フォールバック）'

echo
echo "=== ②対象外（本文・タイトルを書かない） ==="
t allow noise.jsonl mcp__github__update_pull_request "$PR_META" 'update_pull_request（reviewers・draft だけ）'
t allow noise.jsonl Bash '{"command":"gh pr edit 1 --add-reviewer hiyuzawa-radar-lab"}' 'gh pr edit --add-reviewer'
t allow noise.jsonl Bash '{"command":"gh pr view 1 --json body"}' 'gh pr view（読み取り）'
t allow noise.jsonl Bash '{"command":"git status --short"}' '無関係なコマンド'
t allow noise.jsonl mcp__github__search_pull_requests '{"query":"repo:x is:pr"}' '無関係なMCPツール'
t allow noise.jsonl Bash '{"command":"grep -rn \"gh pr create\" docs/"}' 'grep の引数に語が現れるだけ'
t allow noise.jsonl Bash '{"command":"git commit -m \"gh pr create の前に /pr を通す\""}' 'コミットメッセージに語が現れるだけ'
t allow noise.jsonl Bash '{"command":"echo \"gh pr edit --body で本文を直す\""}' 'echo の引数に語が現れるだけ'
t allow noise.jsonl Bash '{"command":"gh pr create --help"}' 'gh pr create --help'
t allow noise.jsonl Bash '{"command":"gh pr comment 1 --body コメント"}' 'gh pr comment（PR本文ではない）'
t allow noise.jsonl Bash '{"command":"gh pr edit 1 -B main"}' 'gh pr edit -B（--base。本文ではない）'
t allow noise.jsonl mcp__github__update_pull_request_branch '{"owner":"o","repo":"r","pullNumber":1}' 'update_pull_request_branch（ブランチ更新）'
t allow noise.jsonl Bash '{"command":"git commit -m \"手順を直す; gh pr create の前に /pr を通す\""}' '引用の中に区切り記号と語がある'
t allow noise.jsonl Bash '{"command":"grep -rn \"x && gh pr create\" docs/"}' '引用の中に && と語がある'
t allow noise.jsonl Bash '{"command":"gh pr edit 1 -m マイルストーン"}' 'gh pr edit -m（--milestone。本文ではない）'

echo
echo "=== ③許可すべき（/pr を通した痕跡がある） ==="
t allow slash.jsonl mcp__github__create_pull_request "$PR_CREATE" 'スラッシュコマンドで起動'
t allow skilltool.jsonl mcp__github__update_pull_request "$PR_BODY" 'Skill ツールで起動'
t allow read.jsonl mcp__github__update_pull_request "$PR_BODY" 'SKILL.md を Read'
t allow slash.jsonl Bash '{"command":"gh pr create --body-file /tmp/body.md"}' 'gh pr create（痕跡あり）'

echo
echo "=== ④誤検知しない ==="
t block grepnoise.jsonl mcp__github__update_pull_request "$PR_BODY" '自分のBashコマンド・tool_result は痕跡ではない'
t block prreview.jsonl mcp__github__update_pull_request "$PR_BODY" '/pr-review は /pr ではない'
t block assistanttext.jsonl mcp__github__update_pull_request "$PR_BODY" 'AI自身の回答文に痕跡文字列があるだけ'
t block tasknotification.jsonl mcp__github__update_pull_request "$PR_BODY" 'task-notification が痕跡文字列を引用しただけ'

echo
echo "=== ⑤判定材料が無いときは許可側 ==="
t allow - mcp__github__create_pull_request "$PR_CREATE" 'transcript_path が空'
t allow missing.jsonl mcp__github__create_pull_request "$PR_CREATE" 'transcript が存在しない'

echo
echo "=== ⑦レビュアー設定の時期（Draftのうちは設定しない） ==="
# /pr の痕跡があってもブロックする（判定②はスキルの痕跡で解除できない禁止）
t block slash.jsonl mcp__github__create_pull_request "$PR_CREATE_REVIEWER" 'create_pull_request（reviewers。痕跡あり）'
t block noise.jsonl mcp__github__create_pull_request "$PR_CREATE_REVIEWER" 'create_pull_request（reviewers。痕跡なし）'
t block slash.jsonl Bash '{"command":"gh pr create --draft --fill --reviewer hiyuzawa-radar-lab"}' 'gh pr create --reviewer'
t block slash.jsonl Bash '{"command":"gh pr create --fill -r hiyuzawa-radar-lab"}' 'gh pr create -r（短縮形）'
t block slash.jsonl Bash '{"command":"gh pr create --fill --reviewer=hiyuzawa-radar-lab"}' 'gh pr create --reviewer=（= 形式）'
t block slash.jsonl mcp__github__update_pull_request "$PR_REVIEWER_DRAFT" 'update_pull_request（reviewers＋draft:true）'
t allow noise.jsonl mcp__github__update_pull_request "$PR_META" 'update_pull_request（reviewers＋draft:false＝Ready化と同時）'
t allow noise.jsonl mcp__github__update_pull_request "$PR_REVIEWER_ONLY" 'update_pull_request（reviewers だけ＝Ready済みPRへ後から加える）'
t allow slash.jsonl Bash '{"command":"gh pr create --draft --fill -R radarlab-inc/DataSpace-v2"}' 'gh pr create -R（--repo。レビュアーではない）'
# 起票者レビュー（PR #286）で再現した穴と誤ブロックの回帰
t block slash.jsonl Bash '{"command":"gh pr create --draft --fill && gh pr edit 1 --add-reviewer hiyuzawa-radar-lab"}' '同じコマンドの gh pr create → gh pr edit --add-reviewer'
t block slash.jsonl Bash '{"command":"gh pr create --draft --fill \\\n  --reviewer hiyuzawa-radar-lab"}' '行継続で書いた --reviewer'
t block slash.jsonl Bash '{"command":"gh pr create -dfr hiyuzawa-radar-lab"}' 'クラスタ短縮形 -dfr（-d -f -r）'
t allow slash.jsonl Bash '{"command":"gh pr create --fill --title \"-rebase fix\""}' '--title の値が -r で始まるだけ'
t allow slash.jsonl Bash '{"command":"gh pr create --fill -F /tmp/r.md"}' '-F の値が r で始まるだけ'
t allow slash.jsonl Bash '{"command":"gh pr create --draft --fill -Rradarlab-inc/DataSpace-v2"}' '-R の値が密着し r を含むだけ'
t allow noise.jsonl Bash '{"command":"rm -r /tmp/x && gh pr edit 1 --add-reviewer hiyuzawa-radar-lab"}' 'gh pr create を伴わない --add-reviewer（既知の穴）'

# 判定③のフィクスチャ: origin/main の後にspecを1本変更したブランチを持つ一時リポジトリを作る。
# $1: ディレクトリ名, $2: 状態欄の値, $3: チェックボックスの形（checked|mixed|none）
make_repo() {
  local dir="$tmp/$1" state="$2" kind="$3"
  git init -q -b main "$dir"
  git -C "$dir" -c user.email=t@example.com -c user.name=t commit -q --allow-empty -m init
  git -C "$dir" update-ref refs/remotes/origin/main HEAD
  mkdir -p "$dir/specs/process"
  {
    printf -- '# テスト用spec\n\n- 状態: %s\n\n## 実装計画\n\n' "$state"
    case "$kind" in
      checked) printf -- '- [x]手順1\n- [x] 手順2\n' ;;
      mixed)   printf -- '- [x] 手順1\n- [ ] 手順2\n' ;;
      none)    : ;;
    esac
  } > "$dir/specs/process/x.md"
  git -C "$dir" add -A
  git -C "$dir" -c user.email=t@example.com -c user.name=t commit -q -m spec
}

make_repo boltleak '実装中' checked
make_repo boltleak-deco '**実装中**' checked
make_repo multipr '実装中' mixed
make_repo closed '完了' checked
make_repo noboxes '実装中' none

READY='{"owner":"radarlab-inc","repo":"DataSpace-v2","pullNumber":1,"draft":false}'
echo
echo "=== ⑥配線（settings.json の matcher が実ツール名に当たる） ==="
wiring=$(python3 "$(dirname "$0")/guard-pr.wiring.py" "$(cd "$(dirname "$0")/.." && pwd)/settings.json")
if [ -z "$wiring" ]; then
  printf '  ✅ %-5s %s\n' "ok" "matcher が Bash・create_pull_request・update_pull_request に当たる"
  pass=$((pass + 1))
else
  printf '  ❌ %s\n' "$wiring"
  fail=$((fail + 1))
fi

echo
echo "成功: $pass / 失敗: $fail"
[ "$fail" -eq 0 ]
