#!/usr/bin/env sh
set -e

docker compose down
docker compose up -d --build

echo "Deployment local completado"
