#!/bin/bash

echo "=== Checking data directories ==="
ls -la data/
echo ""
echo "=== Workshops in data/workshops ==="
ls -la data/workshops/
echo ""
echo "=== Artworks in data/artworks ==="
ls -la data/artworks/
echo ""
echo "=== Uploads directory ==="
ls -la uploads/
echo ""
echo "=== PM2 Logs (last 50 lines) ==="
pm2 logs atelieral --lines 50 --nostream
echo ""
echo "=== Testing storage.ts location ==="
ls -la src/lib/storage.ts
echo ""
echo "=== Checking process.cwd() ==="
node -e "console.log('process.cwd():', process.cwd())"
