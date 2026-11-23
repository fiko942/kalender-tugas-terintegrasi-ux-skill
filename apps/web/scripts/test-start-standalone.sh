#!/bin/sh
set -eu
SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
ROOT=$(CDPATH= cd -- "$SCRIPT_DIR/.." && pwd)
HELPER="$SCRIPT_DIR/start-standalone.test.sh"

"$HELPER"

TEMP_ROOT=$(mktemp -d)
trap 'rm -rf "$TEMP_ROOT"' EXIT
mkdir -p "$TEMP_ROOT/apps/web/scripts"
cp "$HELPER" "$TEMP_ROOT/apps/web/scripts/"
if "$TEMP_ROOT/apps/web/scripts/start-standalone.test.sh" >/dev/null 2>&1; then
  echo "Expected missing-assets precondition to fail." >&2
  exit 1
fi

echo "Standalone helper checks passed (assets copied; missing-build failure handled)."
