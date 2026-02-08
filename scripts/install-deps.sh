#!/usr/bin/env sh
set -e

# Simple portable installer: prefers lockfiles (npm/yarn/pnpm) when present.
# Usage: ./scripts/install-deps.sh

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

echo "Project root: $ROOT_DIR"

if [ -f package-lock.json ]; then
  if command -v npm >/dev/null 2>&1; then
    echo "Found package-lock.json — using npm (npm ci)"
    npm ci
    exit 0
  else
    echo "npm not found. Please install Node.js (which includes npm) or use nvm/homebrew."
    echo "See README or run: curl -fsSL https://github.com/nvm-sh/nvm#install | bash"
    exit 2
  fi
fi

if [ -f yarn.lock ]; then
  if command -v yarn >/dev/null 2>&1; then
    echo "Found yarn.lock — using yarn install"
    yarn install
    exit 0
  else
    echo "yarn not found. Install Yarn (https://yarnpkg.com/getting-started/install)"
    exit 2
  fi
fi

if [ -f pnpm-lock.yaml ]; then
  if command -v pnpm >/dev/null 2>&1; then
    echo "Found pnpm-lock.yaml — using pnpm install"
    pnpm install
    exit 0
  else
    echo "pnpm not found. Install pnpm (https://pnpm.io/installation)"
    exit 2
  fi
fi

echo "No lockfile detected — falling back to npm install if available"
if command -v npm >/dev/null 2>&1; then
  npm install
  exit 0
else
  echo "npm not found. Install Node.js and npm first. Recommended: nvm or Homebrew."
  echo "Homebrew: brew install node"
  echo "nvm (recommended for dev): https://github.com/nvm-sh/nvm"
  exit 2
fi
