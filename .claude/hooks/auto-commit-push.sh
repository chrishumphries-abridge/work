#!/bin/bash

# Auto-commit and push after Claude Code file saves
# Triggered by PostToolUse hook on Edit/Write events

# Read hook input from stdin
INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // .tool_input.notebook_path // empty')

# Only operate on files within this repo
case "$FILE_PATH" in
  /Users/chris/work/*) ;;
  *) exit 0 ;;
esac

cd /Users/chris/work || exit 0

# Stage all changes
git add -A

# Only commit if there are staged changes
if git diff --cached --quiet; then
  exit 0
fi

# Commit with the filename for context
FILENAME=$(basename "$FILE_PATH")
git commit -m "Auto-save: ${FILENAME}" --no-verify

# Push, but don't fail if it doesn't work
git push 2>/dev/null || true

exit 0
