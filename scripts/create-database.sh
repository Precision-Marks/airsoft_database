#!/bin/bash

SUPPORTED_NODE_MAJORS="24 25"
CURRENT_NODE_MAJOR=$(node -p "process.versions.node.split('.')[0]" 2>/dev/null)

# SQLite native bindings must match the Node ABI used to run ts-node.
if ! echo " ${SUPPORTED_NODE_MAJORS} " | grep -q " ${CURRENT_NODE_MAJOR} "; then
  echo "ERROR: Node.js 24.x or 25.x is required to create databases." >&2
  echo "Current Node.js: $(node -v 2>/dev/null || echo 'not found')" >&2
  echo "Run 'nvm use' or install/use a supported Node.js version, then run 'npm install'." >&2
  exit 1
fi

SKIP_GIT_CHECK=0
for arg in "$@"; do
  case "$arg" in
    --no-git-check|--skip-git-check|-n)
      SKIP_GIT_CHECK=1
      ;;
  esac
done

# Check if the current directory is a git repository
if [ ! -d .git ]; then
  echo "Not a git repository"
  exit 1
fi

if [ "$SKIP_GIT_CHECK" -eq 0 ]; then
  # Check uncommit git files
  #untracked_files=$(git status --porcelain | grep '^??' | awk '{print $2}')
  # Exclude files under ./db/ from the check
  untracked_files=$(git status --porcelain | awk '{print $2}' | grep -v '^db/' || true)

  if [ -n "$untracked_files" ]; then
    echo "ERROR: Uncommit git file(s) exist:"
    echo "$untracked_files"
    exit 1
  fi
fi

COMMIT=`git rev-parse --short HEAD` || exit 1
echo "Commit ID: $COMMIT"
npx ts-node src/index.ts -c $COMMIT
