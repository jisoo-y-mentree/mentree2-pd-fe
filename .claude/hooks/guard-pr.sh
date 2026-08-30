#!/usr/bin/env bash
# PreToolUse hook: PRまわりの3つの経路を機械で塞ぐ。
#   ① PR本文・タイトルを書き込むツール呼び出しを、/pr スキルを通していないセッションでは
#      拒否する（[/pr スキル](../skills/pr/SKILL.md) を機械的に強制する）。
#   ② Draft段階でレビュー依頼を飛ばす呼び出しを拒否する（レビュアーの設定はReady化と
#      同じ呼び出しで行う）。
#   ③ Boltのクローズが漏れたままのReady化を拒否する（クローズ承認とspecの `完了` 更新は
#      Ready化の前に済ませ、PRの差分に含める）。
#
# なぜ①が必要か: PRテンプレートの記入指示と /pr スキルは揃っているのに、本文を手書きして
# スキルを通さない事故が繰り返し起きた（「/pr を通す」と対策に書いた直後の本文更新でも
# 通していない）。文章のルールを足しても効かないため、書き込みの経路を機械で塞ぐ
# （[mistake-prevention.md](../../docs/guidelines/mistake-prevention.md) ステップ3）。
# 経緯: [ふりかえり 260818_30c307](../../docs/guidelines/retrospectives/260818_30c307.md)。
#
# なぜ②が必要か: PRはDraftで作り、CIと起票者レビューを通してから Ready にする
# （[self-review-workflow.md](../../docs/guidelines/self-review-workflow.md) §1）。
# レビュアーの設定は手順6（Ready化）だが、`create_pull_request` が `reviewers` を受け取る
# ため、Draft作成の1呼び出しでレビュー依頼まで飛んでいた（実測: PR #273 は draft のまま
# requested_reviewers を持つ）。レビュアー側にはDraftの時点で通知とキュー入りが起きる。
# 順序を書いていたのは [ai-usage-rules.md](../../docs/guidelines/ai-usage-rules.md) の括弧書き
# 1か所（「Ready for review にしてから」）だけで、Draft先行フローの手順書にも機械強制にも
# 無かったのが原因なので、文書の明示と合わせて呼び出しの経路でも止める。
#
# stdinにJSON（tool_name・tool_input・transcript_path等）が渡される。exit 2でツール実行を
# ブロックし、stderrがClaudeに伝わる（guard-git.sh と同じ経路。JSON出力の
# permissionDecision は本リポジトリで実績が無いため採らない）。
#
# 判定①（/pr スキルの強制。痕跡があれば許可する）:
#   create_pull_request                      → 対象（タイトル・本文を必ず書く）
#   update_pull_request で body・title を含む → 対象
#   update_pull_request が reviewers・draft・state・base だけ → 対象外（Ready化を止めない）
#   Bash で gh pr create を実行する            → 対象
#   Bash で gh pr edit に本文・タイトルのフラグ（--body/--body-file/--title・-b/-F/-t）を与える → 対象
#     （短縮形は `gh pr edit --help` の実出力で確認済み: -b=--body・-F=--body-file・-t=--title。
#      -B=--base・-m=--milestone・-R=--repo は本文ではないため対象に含めない）
#   対象かつ当該セッションで /pr の読み込み痕跡がある → 許可
#   対象かつ痕跡が無い                        → ブロック
#
# 判定②（レビュアー設定の時期。痕跡に関係なく常にブロックする）:
#   create_pull_request に reviewers が非空            → ブロック（PRはDraftで作る＝常に早すぎる）
#   Bash で gh pr create に --reviewer / -r を与える     → ブロック（短縮形は `gh pr create --help`
#     の実出力で確認済み: -r=--reviewer。-R=--repo は大文字で別物なので含めない）
#   Bash で gh pr create と同じコマンドの gh pr edit に --add-reviewer を与える → ブロック
#     （`gh pr create --draft … && gh pr edit --add-reviewer …` の形。作成が同じコマンドに
#      ある以上、対象PRがDraftであることが呼び出しの形から確定するため、下の穴に当たらない）
#   update_pull_request が reviewers と draft:true を同時に持つ → ブロック（Draftへ戻しながら依頼する）
#   update_pull_request が reviewers だけ・reviewers＋draft:false → 許可
#     （前者はReady済みPRへ後からTLを加える正当な操作＝CLAUDE.md「TLをレビュアーに加える」、
#      後者がReady化と同時の設定＝本ルールが求める形）
#   判定①と重なる呼び出し（create_pull_request 等）は、②を先に見る
#
# 判定③（Ready化時のBoltクローズ検査。スキルの痕跡では解除できず、specを直せば通る）:
#   update_pull_request が draft:false を持つ／Bash で gh pr ready を実行する → 検査対象
#     （`gh pr ready --undo` はDraftへ戻す操作なので対象外）
#   現在のリポジトリで origin/main との merge-base から HEAD までに変更した specs/**/*.md の
#   うち、状態欄が `実装中` で、かつチェックボックスが1つ以上あり**全て [x]** のファイルが
#   ある → ブロック（実装計画・受入条件を消化し切ったのに `完了` にしていない＝クローズ漏れ。
#   /bolt フェーズ3のクローズ〈クローズ承認→進行記録→状態欄 `完了`→コミット〉を先に決着させる）
#   未チェックの項目が残るspec → 許可（UoWを複数PRに分ける運用・HUMAN TASK待ちの正当な形。
#   実測: FE-006 の範囲分割・FE-008 の self-review 差し戻しがこの形で main にある）
#   状態欄が `実装中` 以外・specに触れないPR → 許可
#   なぜ: boltのクローズ処理（クローズ承認→spec更新）を忘れたままPR作成フローへ入り、
#   マージ後・approve後にクローズしようとする事故が繰り返し起きたため、忘れても差分に
#   証拠が残ることを利用してReady化の呼び出しで機械的に止める。
#
# Bashの判定は**セグメントの語頭を固定する**。`gh pr create` の語が引数として現れるだけの
# 操作（`grep -rn "gh pr create"`・`echo`・`git commit -m "…"`）を止めないため。語の共起で
# 判定すると誤ブロックになることは guard-git.sh が PD-47 で一度直した型で、本フックの初版は
# セグメント分割だけ写して語頭固定を写しておらず、同じ誤検知を再現した（起票者レビューで検出）。
#
# 痕跡の判定は transcript を JSONL として構造解析する。素の grep にしないのは、AI自身の
# Bashコマンド文字列や検索結果（tool_result）に `.claude/skills/pr` が現れるため
# （本フックの設計時に実際に現れた）。
#
# 既知の穴（塞げていないもの。「塞いだ」と誤読しないため明記する。網羅ではなく、判明しているもの）:
#   - transcript_path が渡らない・読めない環境では素通りする（判定材料が無いため。
#     guard-git.sh と同じ「材料なしは許可側」に揃える。読める環境での検出はテストで確認する）
#   - `gh api --method PATCH /repos/…/pulls/…` や `curl` による直接更新は検出しない
#     （PR本文の更新に見える形が多様すぎるため。判定を広げるならここを足す）
#   - サブエージェントは自分の transcript を見るため、親で /pr を通していてもブロックされる
#     （安全側。サブエージェントに本文を書かせるなら、そのサブエージェント自身が /pr を通す）
#   - `gh pr comment` は対象外（PR上のコメントであってPR本文ではない）
#   - Draft PRへ**後から reviewers だけ**付ける更新（`update_pull_request` の reviewers 単独・
#     単独で走る `gh pr edit --add-reviewer`）は素通りする。理由は**セッションを跨ぐ正当な操作を
#     誤ブロックするから** — 別セッションでReady化したPRへTLを後から加える操作（CLAUDE.md
#     「TLをレビュアーに加える」）と呼び出しの形が同じで、区別する材料が呼び出し側に無い。
#     transcript の痕跡（同セッションで draft:false を出したか）で判定する案は、この理由で採らない
#     （本フックはネットワークも叩かないため、対象PRのdraft状態そのものも実測しない）。
#     同じコマンドに `gh pr create` がある形だけは、Draftであることが確定するのでブロックする
#   - 痕跡は「セッション中に一度でも読んだか」だけを見る。読んでから何往復も後に本文を書いても
#     許可される（テンプレートへ突き合わせた直近性は担保しない）
#   - 引用が閉じていない行は記号での分割にフォールバックするため、引用の中の語で誤ブロックしうる
#     （止まる側。/pr を通せば進める）
#   - python が失敗したときは無言で素通りする（`2>/dev/null` ＋ `|| exit 0`。guard-git.sh と同じ）。
#     壊れたことに気づく手段はテストだけなので、guard-pr.test.sh をCIのDocsジョブへ接続してある
#   - 判定③は**現在チェックアウト中のブランチ**を見る。対象PRのブランチを手元に持たない
#     セッションからのReady化は素通りし、別ブランチのPRを指定した update_pull_request は
#     手元のブランチで誤判定しうる（本フックはネットワークを叩かない設計のため、pullNumber
#     からブランチを引けない）。cwd がgitリポジトリ外・origin/main 未取得も素通りする
#   - 判定③はチェックボックスを1つも持たないspecのクローズ漏れを検出しない（消化し切った
#     ことを差分から判定する材料が無いため、許可側に倒す）
#   - 判定③のspec本文は作業ツリーから読む（Ready化の時点では HEAD と一致している前提。
#     コミットせずに状態欄だけ直すと、pushしていなくても通ってしまう）
#   - 判定③は**Readyで直接PRを作る経路を見張らない**（`create_pull_request` の draft:false・
#     `--draft` の無い `gh pr create`）。Ready化を経ないためクローズ漏れのままReady PRができる。
#     Draft作成そのものは運用ルール（self-review-workflow §1）で機械強制していないため、
#     この経路を塞ぐかは別の判断として扱う
#
# テスト: .claude/hooks/guard-pr.test.sh

set -u

input=$(cat)

verdict=$(printf '%s' "$input" | python3 -c '
import json, os, re, shlex, sys

try:
    d = json.load(sys.stdin)
except Exception:
    sys.exit(0)

tool = d.get("tool_name", "") or ""
ti = d.get("tool_input", {}) or {}
if not isinstance(ti, dict):
    sys.exit(0)

OPERATORS = ("&&", "||", ";", "|", "&", "(", ")", "{", "}", "\x3c", "\x3e")
# セグメント頭に付く展開・グループ化の記号（$( ` など）
LEADING_NOISE = "$(`{! \t"
ASSIGN = re.compile(r"^[A-Za-z_][A-Za-z0-9_]*=")
# 実行語の前に置かれるラッパーとシェルキーワード（語頭判定のときだけ読み飛ばす）
WRAPPERS = ("sudo", "env", "command", "nohup", "time", "timeout", "xargs", "nice", "stdbuf",
            "if", "then", "else", "elif", "do", "while", "until", "!")
HELP_FLAGS = ("--help", "-h")
DURATION = re.compile(r"^\d+[smhd]?$")
# gh pr create/edit が本文・タイトルを受け取るフラグ（-b/-F/-t。値が密着した -b本文 も含む）。
# -B（--base）・-m（--milestone）・-R（--repo）は本文ではないため含めない（大文字小文字を区別する）
BODY_FLAGS = re.compile(r"^(--(body|body-file|title)(=|$)|-[bFt])")
# gh pr create/edit が値を取るフラグ（判定②でフラグ位置と値位置を区別するために使う）。
# `gh pr create --title "-rebase fix"` の値が -r で始まってもレビュアー指定と読まないため。
# 短縮形の -R（--repo）は大文字で別物（大文字小文字を区別する）
VALUE_LONG = ("assignee", "base", "body", "body-file", "head", "label", "milestone", "project",
              "repo", "reviewer", "template", "title", "add-assignee", "add-label", "add-project",
              "add-reviewer", "remove-assignee", "remove-label", "remove-project",
              "remove-reviewer")
# -R（--repo）も**値を取る**側に入れる。入れないと密着形 `-Rowner/repo` の値を1文字ずつ
# 走査し、リポジトリ名の r を --reviewer と読んで誤ブロックする（起票者レビューで再現）
VALUE_SHORT = "aBbFHlmpRrTt"
CONTINUATION = re.compile(r"\\\n[ \t]*")


def segments(command):
    """コマンド行をセグメント（語のリスト）へ分割する。

    引用の内側は分割しない。`git commit -m "…; gh pr create …"` のように引用の中に
    区切り記号や語が現れるだけの操作を誤ブロックしないため（初版は記号で機械的に
    分割しており、起票者レビューで誤ブロックが再現した）。
    改行は先に分けてから語彙解析する（shlex は改行を単なる空白として扱うため）。
    ただし**行末のバックスラッシュ（行継続）は先に畳む** — 継続はシェルにとって1行で、
    分けると `gh pr create \\` の次行に書いたフラグが別セグメントへ落ちる
    （起票者レビューで、行継続で書いた --reviewer の見逃しが再現した）。
    """
    out = []
    for line in CONTINUATION.sub(" ", command or "").split("\n"):
        try:
            lex = shlex.shlex(line, posix=True, punctuation_chars=True)
            lex.whitespace_split = True
            tokens = list(lex)
        except ValueError:
            # 引用が閉じていない等。記号での分割にフォールバックする（判定できないより粗くても止める）
            tokens = re.split(r"\s+", re.sub(r"&&|\|\||;|\|", " \x01 ", line))
            tokens = ["|" if t == "\x01" else t for t in tokens if t]
        cur = []
        for t in tokens:
            if t in OPERATORS:
                out.append(cur)
                cur = []
            else:
                cur.append(t)
        out.append(cur)
    return out


def gh_pr_subcommand(tokens):
    """セグメントが gh pr create / edit / ready の実行なら (部分コマンド, 残りの語) を返す。"""
    tokens = [t.lstrip(LEADING_NOISE) for t in tokens]
    tokens = [t for t in tokens if t]
    skipped = False
    # 実行語に達するまで、環境変数代入・ラッパー・シェルキーワードと、それらが取る
    # フラグ・時間指定（timeout 60・nice -n 10 等）を読み飛ばす
    while tokens and (ASSIGN.match(tokens[0]) or tokens[0] in WRAPPERS
                      or (skipped and (tokens[0].startswith("-") or DURATION.match(tokens[0])))):
        skipped = True
        tokens.pop(0)
    if not tokens or os.path.basename(tokens[0]) != "gh":
        return "", []
    rest = tokens[1:]
    if any(t in HELP_FLAGS for t in rest):
        return "", []
    words = [t for t in rest if not t.startswith("-")]
    for i in range(len(words) - 1):
        if words[i] == "pr" and words[i + 1] in ("create", "edit", "ready"):
            return words[i + 1], rest
    return "", []


def flag_hit(rest, long_names, short_names):
    """フラグ位置だけを見て、指定のフラグが与えられているかを判定する。

    値のトークンは読み飛ばす。`gh pr create --title "-rebase fix"` の値が -r で始まる
    だけで誤ブロックしていた（起票者レビューで再現）。フック冒頭が自ら書いている
    「語の共起で判定すると誤ブロックになる」型に当たるため、位置で判定する。
    クラスタ短縮形（`-dfr user` ＝ -d -f -r user）は、値を取る短縮形が現れるまでを
    真偽フラグとして1文字ずつ見る（初版は見逃していた）。
    """
    i = 0
    while i < len(rest):
        t = rest[i]
        if t.startswith("--"):
            name, eq, _ = t[2:].partition("=")
            if name in long_names:
                return True
            if not eq and name in VALUE_LONG:
                i += 1  # 次のトークンはこのフラグの値
        elif len(t) > 1 and t.startswith("-"):
            body = t[1:]
            for j, ch in enumerate(body):
                if ch in short_names:
                    return True
                if ch in VALUE_SHORT:
                    # ここから先は値。語の末尾に置かれていれば次のトークンが値
                    if j == len(body) - 1:
                        i += 1
                    break
        i += 1
    return False


def reviewer_target():
    """Draft段階でレビュー依頼を飛ばす呼び出しかを判定する。

    レビュアーの設定はReady化と同じ呼び出しで行う（self-review-workflow §1 手順6）。
    ここで見るのは呼び出しの形だけで、対象PRの現在のdraft状態は問い合わせない
    （上の「既知の穴」のとおり、単独の reviewers 更新は素通りする）。
    """
    if tool.endswith("create_pull_request"):
        return "PR作成と同時のレビュアー設定" if ti.get("reviewers") else ""
    if tool.endswith("update_pull_request"):
        if ti.get("reviewers") and ti.get("draft") is True:
            return "Draftへ戻す更新と同時のレビュアー設定"
        return ""
    if tool == "Bash":
        parsed = [gh_pr_subcommand(seg) for seg in segments(ti.get("command", ""))]
        # 同じコマンドに gh pr create があれば、その後の gh pr edit --add-reviewer も
        # Draft PRへの依頼と確定する（作成直後の追加は「既知の穴」の理由が成立しない）
        creating = any(sub == "create" for sub, _ in parsed)
        for sub, rest in parsed:
            if sub == "create" and flag_hit(rest, ("reviewer",), "r"):
                return "gh pr create --reviewer によるPR作成と同時のレビュアー設定"
            if creating and sub == "edit" and flag_hit(rest, ("add-reviewer", "reviewer"), ""):
                return "gh pr create と同じコマンドの gh pr edit --add-reviewer によるレビュアー設定"
    return ""


def ready_target():
    """PRをReadyへ切り替える呼び出しかを判定する（判定③の検査対象の選別）。

    ここで見るのは呼び出しの形だけ。specの走査はシェル側（git を叩く）が行う。
    """
    if tool.endswith("update_pull_request"):
        return "Ready化（draft:false）" if ti.get("draft") is False else ""
    if tool == "Bash":
        for seg in segments(ti.get("command", "")):
            sub, rest = gh_pr_subcommand(seg)
            # --undo はDraftへ戻す操作＝Ready化ではないので対象外
            if sub == "ready" and not flag_hit(rest, ("undo",), ""):
                return "gh pr ready によるReady化"
    return ""


def is_target():
    """本文・タイトルを書き込む呼び出しかを判定する。"""
    if tool.endswith("create_pull_request"):
        return "PRの作成（タイトル・本文を書く）"
    if tool.endswith("update_pull_request"):
        wrote = [k for k in ("body", "title") if k in ti]
        if wrote:
            return "PRの" + "・".join({"body": "本文", "title": "タイトル"}[k] for k in wrote) + "の更新"
        return ""
    if tool == "Bash":
        for seg in segments(ti.get("command", "")):
            sub, rest = gh_pr_subcommand(seg)
            if not sub:
                continue
            if sub == "create" or any(BODY_FLAGS.match(t) for t in rest):
                return "gh pr " + sub + " によるタイトル・本文の書き込み"
    return ""


SKILL_DIR = re.compile(r"/\.claude/skills/pr(?![\w-])")
SKILL_HEADER = re.compile(r"Base directory for this skill:")
SKILL_FILE = ".claude/skills/pr/SKILL.md"


def text_shows_skill(text):
    """注入されたスキル本文・スラッシュコマンドの行だけを痕跡と認める。

    先頭一致にするのは、AI自身の回答文やサブエージェントの報告（task-notification）が
    同じ文字列を**説明として引用**しただけで痕跡が成立してしまうため。実際にこのフックを
    設計・レビューする作業自身が、自分のフックを無効化していた（起票者レビューで検出）。
    正規の注入はどちらもテキストの先頭から始まる（実 transcript で確認済み）。
    """
    if not isinstance(text, str):
        return False
    head = text.lstrip()[:200]
    if head.startswith("<command-message>") and "<command-name>/pr</command-name>" in head:
        return True
    return bool(head.startswith("Base directory for this skill:") and SKILL_DIR.search(head))


def block_shows_skill(b):
    if not isinstance(b, dict):
        return False
    if b.get("type") == "tool_use":
        inp = b.get("input") or {}
        if not isinstance(inp, dict):
            return False
        if b.get("name") == "Skill" and str(inp.get("skill", "")).lstrip("/") == "pr":
            return True
        if b.get("name") == "Read" and str(inp.get("file_path", "")).endswith(SKILL_FILE):
            return True
    return False


def skill_loaded(path):
    """当該セッションで /pr が読み込まれた痕跡を transcript から探す。"""
    if not path or not os.path.isfile(path):
        return None  # 判定材料なし
    try:
        with open(path, encoding="utf-8", errors="replace") as f:
            for line in f:
                # 粗フィルタ（速度のため）。判定は下の構造解析で行う。
                if not any(k in line for k in ("skills/pr", "command-name", chr(34) + "skill" + chr(34))):
                    continue
                try:
                    entry = json.loads(line)
                except Exception:
                    continue
                message = entry.get("message") or {}
                # テキストの痕跡は user 側のエントリだけを認める（AIの回答文・サブエージェントの
                # 報告が同じ文字列を引用しただけでは痕跡としない）。tool_use は assistant 側にしか
                # 現れないため、ツール名とパスの構造判定に委ねる。
                is_user = entry.get("type") == "user" or message.get("role") == "user"
                content = message.get("content")
                if isinstance(content, str):
                    if is_user and text_shows_skill(content):
                        return True
                elif isinstance(content, list):
                    for b in content:
                        if not isinstance(b, dict):
                            continue
                        if b.get("type") == "text":
                            if is_user and text_shows_skill(b.get("text", "")):
                                return True
                        elif block_shows_skill(b):
                            return True
    except OSError:
        return None
    return False


# 判定②（レビュアー設定の時期）を先に見る。スキルの痕跡では解除できない禁止だから。
# 次に①（/pr の痕跡）、最後に③（Ready化のクローズ検査）。①を③より先にするのは、
# 1呼び出しにつき1判定しか返せない構造で、①で止めても /pr を通した再実行が③へ到達するため。
reviewer = reviewer_target()
if reviewer:
    print("reviewer")
    print(reviewer)
    sys.exit(0)

target = is_target()
if target:
    loaded = skill_loaded(d.get("transcript_path", ""))
    if loaded is False:
        print("skill")
        print(target)
        sys.exit(0)

' 2>/dev/null) || exit 0

[ -n "$verdict" ] || exit 0

kind=$(printf '%s\n' "$verdict" | sed -n 1p)
reason=$(printf '%s\n' "$verdict" | sed -n 2p)


if [ "$kind" = "reviewer" ]; then
  cat >&2 <<MSG
${reason}을 막았습니다. 리뷰어는 Ready화와 같은 호출로 설정합니다.

PR은 Draft로 만들고, CI와 기표자 리뷰(/pr-review)를 통과시킨 뒤 Ready로 합니다
(docs/guidelines/designer-workflow.md). Draft 시점에 리뷰 의뢰를 보내면,
리뷰어의 차례가 시작되기 전에 알림과 리뷰 대기 큐 등록이 일어납니다.

방법: 먼저 reviewers 를 넘기지 않고 Draft로 만듭니다. 기표자 리뷰가 결착된 뒤에
update_pull_request(draft:false + reviewers)의 1호출로 Ready화와 설정을 함께 합니다.
Ready인 PR에 나중에 리뷰어를 더하는 갱신(reviewers 만)은 막지 않습니다.
MSG
  exit 2
fi

cat >&2 <<MSG
${reason}을 막았습니다. 이 세션에서는 /pr 을 통과시키지 않았습니다.

먼저 /pr (.claude/skills/pr/SKILL.md)을 실행하십시오. .github/pull_request_template.md 의
각 절 코멘트(기입 지시)에 본문과 제목을 맞춰본 뒤 같은 호출을 다시 실행하십시오.
본문을 쓰지 않는 갱신(reviewers·draft·state·base 만)은 막지 않습니다.
서브에이전트로 동작 중이면 부모가 통과시켜도 듣지 않습니다(스스로 /pr 을 통과시킵니다).

왜: 템플릿의 기입 지시와 스킬이 갖춰져 있는데 본문을 손으로 쓰는 사고가 반복됐기
때문입니다. 쓰기 경로에서 기계적으로 멈춥니다.
MSG
exit 2
