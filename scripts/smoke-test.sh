#!/usr/bin/env sh
set -e

BASE_URL=${1:-http://localhost:3000}

echo "Running smoke tests against $BASE_URL"

curl -fsS "$BASE_URL/api/health" > /dev/null
curl -fsS "$BASE_URL/api/items" > /dev/null
curl -fsS "$BASE_URL/metrics" > /dev/null

echo "Smoke tests passed"
