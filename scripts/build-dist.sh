#!/usr/bin/env bash
# Build per-harness bundles from the single source (impeccable-style).
# Source of truth: commands/shiproom.md, skills/shiproom/, council/, dashboard/
set -euo pipefail
cd "$(dirname "$0")/.."
rm -rf dist && mkdir -p dist

payload() { # shared protocol payload every harness needs
  mkdir -p "$1"
  cp -r council dashboard SHIPROOM.md "$1/"
}

# Claude Code: slash command + skill
mkdir -p dist/claude-code/.claude/commands dist/claude-code/.claude/skills
cp commands/shiproom.md dist/claude-code/.claude/commands/shiproom.md
cp -r skills/shiproom dist/claude-code/.claude/skills/
payload dist/claude-code

# Codex CLI / Copilot / Cursor / generic AGENTS.md harnesses: skill dirs + AGENTS.md
for h in "codex:.agents/skills" "cursor:.cursor/skills" "github:.github/skills" "gemini:.gemini/skills" "opencode:.opencode/skills"; do
  tool="${h%%:*}"; dir="${h##*:}"
  mkdir -p "dist/$tool/$dir"
  cp -r skills/shiproom "dist/$tool/$dir/"
  cp AGENTS.md "dist/$tool/"
  payload "dist/$tool"
done

echo "dist/ built:"; find dist -maxdepth 2 -type d | sort
