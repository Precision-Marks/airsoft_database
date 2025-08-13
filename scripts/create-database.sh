#!/bin/bash

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
  untracked_files=$(git status --porcelain | awk '{print $2}')

  if [ -n "$untracked_files" ]; then
    echo "ERROR: Uncommit git file(s) exist:"
    echo "$untracked_files"
    exit 1
  fi
fi

COMMIT=`git rev-parse --short HEAD` || exit 1
echo "Commit ID: $COMMIT"
npx ts-node src/index.ts -c $COMMIT
