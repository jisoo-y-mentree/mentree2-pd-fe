#!/usr/bin/env python3
"""guard-pr.sh の配線（.claude/settings.json の PreToolUse matcher）を検査する。

guard-pr.test.sh の観点⑥から呼ばれる。テスト本体は hook を直接叩くため、matcher が
誤っていても①〜⑤は緑のままになり、hook が一度も発火しない状態を見逃す（起票者レビューで指摘）。

引数: settings.json のパス。問題があれば内容を1行で標準出力へ書く（何も出さなければ合格）。
"""

import json
import re
import sys

TOOLS = ("Bash", "mcp__github__create_pull_request", "mcp__github__update_pull_request")


def main() -> int:
    try:
        settings = json.load(open(sys.argv[1], encoding="utf-8"))
    except (OSError, ValueError) as e:
        print("settings.json を読めない: %s" % e)
        return 0

    entries = settings.get("hooks", {}).get("PreToolUse", [])
    matchers = [
        e.get("matcher", "")
        for e in entries
        if any("guard-pr.sh" in h.get("command", "") for h in e.get("hooks", []))
    ]
    if len(matchers) != 1:
        print("guard-pr.sh を呼ぶ PreToolUse エントリが1つではない: %d" % len(matchers))
        return 0

    try:
        pattern = re.compile(matchers[0])
    except re.error as e:
        print("matcher が正規表現として不正: %s" % e)
        return 0

    missing = [t for t in TOOLS if not pattern.search(t)]
    if missing:
        print("matcher が届かないツール: " + "・".join(missing))
    return 0


if __name__ == "__main__":
    sys.exit(main())
