#!/bin/sh
set -e

echo "[DOCKER ENTRYPOINT] Synchronizing database schema with Prisma..."
npx prisma db push --skip-generate

echo "[DOCKER ENTRYPOINT] Starting production Express server..."
exec npm start
