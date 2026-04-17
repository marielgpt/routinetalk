#!/bin/bash
# Copies shared credentials from user-service .env into all other services,
# patching PORT and adding service-specific variables.

set -e

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SOURCE="$ROOT/services/user-service/.env"

if [ ! -f "$SOURCE" ]; then
  echo "Error: $SOURCE not found"
  exit 1
fi

DATABASE_URL=$(grep '^DATABASE_URL=' "$SOURCE" | cut -d= -f2-)
JWT_SECRET=$(grep '^JWT_SECRET=' "$SOURCE" | cut -d= -f2-)
NODE_ENV=$(grep '^NODE_ENV=' "$SOURCE" | cut -d= -f2-)

write_env() {
  local path="$1"
  local content="$2"
  echo "$content" > "$path"
  echo "  wrote $path"
}

echo "Setting up .env files..."

write_env "$ROOT/services/routine-service/.env" \
"PORT=3002
DATABASE_URL=$DATABASE_URL
JWT_SECRET=$JWT_SECRET
NODE_ENV=$NODE_ENV"

write_env "$ROOT/services/cart-service/.env" \
"PORT=3003
DATABASE_URL=$DATABASE_URL
JWT_SECRET=$JWT_SECRET
MCP_API_KEY=
NODE_ENV=$NODE_ENV"

write_env "$ROOT/services/notification-service/.env" \
"PORT=3004
DATABASE_URL=$DATABASE_URL
RABBITMQ_URL=
EMAIL_API_KEY=
NODE_ENV=$NODE_ENV"

write_env "$ROOT/services/billing-service/.env" \
"PORT=3005
DATABASE_URL=$DATABASE_URL
JWT_SECRET=$JWT_SECRET
NODE_ENV=$NODE_ENV"

echo "Done."
