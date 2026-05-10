#!/bin/sh

SUPPORTED_NODE_MAJORS="24 25"

format_supported_node_majors() {
  echo "${SUPPORTED_NODE_MAJORS}" | sed 's/ /.x or /g; s/$/.x/'
}

require_supported_node() {
  build_action="$1"
  current_node_major=$(node -p "process.versions.node.split('.')[0]" 2>/dev/null)
  supported_node_versions=$(format_supported_node_majors)

  # Native dependencies are built for a specific Node ABI, so fail before writing outputs.
  if ! echo " ${SUPPORTED_NODE_MAJORS} " | grep -q " ${current_node_major} "; then
    echo "ERROR: Node.js ${supported_node_versions} is required to ${build_action}." >&2
    echo "Current Node.js: $(node -v 2>/dev/null || echo 'not found')" >&2
    echo "Run 'nvm use' or install/use a supported Node.js version, then run 'npm install'." >&2
    exit 1
  fi
}
