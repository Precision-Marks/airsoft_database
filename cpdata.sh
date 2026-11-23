#!/usr/bin/env bash
set -euo pipefail

usage() {
  echo "Usage: $(basename "$0") <app_repository_directory>" >&2
  echo "  e.g. $(basename "$0") ../<app_repository>" >&2
  exit 1
}

if [ "$#" -ne 1 ]; then
  usage
fi

APP_REPO="${1%/}"

if [ ! -d "$APP_REPO" ]; then
  echo "Error: App repository directory does not exist: $APP_REPO" >&2
  exit 1
fi

ANDROID_DEST="$APP_REPO/android/app/src/main/assets"
IOS_DEST="$APP_REPO/ios/AirsoftSpotter/Resources"

for DIR in "$ANDROID_DEST" "$IOS_DEST"; do
  if [ ! -d "$DIR" ]; then
    echo "Error: Destination directory does not exist: $DIR" >&2
    exit 1
  fi
done

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

REALM_DB="$REPO_ROOT/db/realm/catalog_data.realm"
REALM_COMMITID="$REPO_ROOT/db/realm/catalog_data.realm.commitid"
SQLITE_DB="$REPO_ROOT/db/sqlite/catalog_data.db"
SQLITE_COMMITID="$REPO_ROOT/db/sqlite/catalog_data.db.commitid"

ANDROID_FILES=("$REALM_DB" "$REALM_COMMITID" "$SQLITE_DB" "$SQLITE_COMMITID")
IOS_FILES=("$SQLITE_DB" "$SQLITE_COMMITID")

# Verify all source files exist before copying
errors=()
for SRC in "${ANDROID_FILES[@]}"; do
  if [ ! -f "$SRC" ]; then
    errors+=("Error: Source file not found: $SRC")
  fi
done

if [ ${#errors[@]} -gt 0 ]; then
  printf "%s\n" "${errors[@]}" >&2
  exit 2
fi

# Copy files into a destination directory (report when an existing file is overwritten)
copy_files() {
  local dest="$1"
  shift
  local src basename dest_path
  for src in "$@"; do
    basename="$(basename "$src")"
    dest_path="$dest/$basename"
    if [ -e "$dest_path" ]; then
      cp -f "$src" "$dest_path"
      echo "Overwritten: $dest_path"
    else
      cp "$src" "$dest_path"
      echo "Copied: $dest_path"
    fi
  done
}

copy_files "$ANDROID_DEST" "${ANDROID_FILES[@]}"
copy_files "$IOS_DEST" "${IOS_FILES[@]}"

exit 0
