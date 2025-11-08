#!/usr/bin/env bash
set -euo pipefail

usage() {
  echo "Usage: $(basename "$0") <destination_directory>" >&2
  exit 1
}

if [ "$#" -ne 1 ]; then
  usage
fi

DEST="$1"

if [ ! -d "$DEST" ]; then
  echo "Error: Destination directory does not exist: $DEST" >&2
  exit 1
fi

# Directory of this script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Find repository root by searching upwards for the .git directory
REPO_ROOT="$SCRIPT_DIR"
while [[ "$REPO_ROOT" != "/" && ! -d "$REPO_ROOT/.git" ]]; do
  REPO_ROOT="$(dirname "$REPO_ROOT")"
done

if [[ ! -d "$REPO_ROOT/.git" ]]; then
  echo "Error: Could not find repository root from script location: $SCRIPT_DIR" >&2
  exit 1
fi

FILES=(
  "$REPO_ROOT/db/realm/catalog_data.realm"
  "$REPO_ROOT/db/realm/catalog_data.realm.commitid"
  "$REPO_ROOT/db/sqlite/catalog_data.db"
  "$REPO_ROOT/db/sqlite/catalog_data.db.commitid"
)

# Verify all source files exist before copying
MISSING=0
for SRC in "${FILES[@]}"; do
  if [ ! -f "$SRC" ]; then
    echo "Error: Source file not found: $SRC" >&2
    MISSING=1
  fi
done

if [ "$MISSING" -eq 1 ]; then
  exit 2
fi

# Copy files (report when an existing file is overwritten)
for SRC in "${FILES[@]}"; do
  BASENAME="$(basename "$SRC")"
  DEST_PATH="$DEST/$BASENAME"
  if [ -e "$DEST_PATH" ]; then
    cp -f "$SRC" "$DEST_PATH"
    echo "Overwritten: $DEST_PATH"
  else
    cp "$SRC" "$DEST_PATH"
    echo "Copied: $DEST_PATH"
  fi
done

exit 0
