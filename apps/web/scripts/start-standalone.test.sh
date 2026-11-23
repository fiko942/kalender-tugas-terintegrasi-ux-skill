#!/bin/sh
set -eu
ROOT=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
SOURCE="$ROOT/.next/static"
TARGET="$ROOT/.next/standalone/.next/static"

if [ ! -d "$SOURCE" ]; then
  echo "Build output missing: $SOURCE" >&2
  exit 1
fi
mkdir -p "$(dirname "$TARGET")"
rm -rf "$TARGET"
cp -R "$SOURCE" "$TARGET"
test -d "$TARGET"
find "$TARGET" -type f -name '*.css' -print -quit | grep -q .
find "$TARGET" -type f -name '*.js' -print -quit | grep -q .
echo "Standalone static asset preparation passed."
