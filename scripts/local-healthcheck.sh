#!/usr/bin/env sh
set -e

URL=${1:-http://localhost:3000/api/health}

status=$(curl -s -o /tmp/health.json -w "%{http_code}" "$URL")
if [ "$status" -ne 200 ]; then
  echo "Healthcheck failed with status $status"
  cat /tmp/health.json
  exit 1
fi

echo "Healthcheck OK"
cat /tmp/health.json
