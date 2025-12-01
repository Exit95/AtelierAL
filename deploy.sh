#!/bin/bash
# ============================================
# ATELIER KL - Safe Deployment Script
# ============================================
# Dieses Script deployed NUR Code-Änderungen.
# Uploads und Daten werden NIEMALS überschrieben!
# ============================================

set -e

SERVER_IP="2a01:4f8:202:1129:2447:2447:1:103"
SERVER_USER="root"
SERVER_PATH="/root/AtelierAL"
SERVER_PASS="409737L2M%"

echo "============================================"
echo "🎨 ATELIER KL - Safe Deployment"
echo "============================================"
echo ""
echo "⚠️  GESCHÜTZTE ORDNER (werden NIE überschrieben):"
echo "   • data/       - Datenbank (Werke, Workshops, Reviews)"
echo "   • uploads/    - Hochgeladene Bilder"
echo "============================================"
echo ""

echo "🔨 Building project..."
npm run build

echo ""
echo "📦 Deploying to server..."

# Deploy mit rsync - WICHTIG: --exclude für geschützte Ordner
sshpass -p "$SERVER_PASS" rsync -avz \
    --delete \
    --exclude 'node_modules' \
    --exclude '.git' \
    --exclude 'data' \
    --exclude 'uploads' \
    --exclude 'client/uploads' \
    --exclude '.vercel' \
    -e "ssh -o StrictHostKeyChecking=no -6" \
    dist/ server.mjs package.json package-lock.json \
    "${SERVER_USER}@[${SERVER_IP}]:${SERVER_PATH}/"

# Fix folder structure (rsync copies content of dist/ not the folder itself)
echo ""
echo "🔧 Fixing folder structure..."
sshpass -p "$SERVER_PASS" ssh -o StrictHostKeyChecking=no -6 \
    "${SERVER_USER}@${SERVER_IP}" \
    "cd ${SERVER_PATH} && \
     rm -rf dist 2>/dev/null || true && \
     mkdir -p dist && \
     mv client server dist/ 2>/dev/null || true && \
     mkdir -p dist/client/uploads && \
     echo '✓ Folder structure fixed'"

# Restart PM2
echo ""
echo "🔄 Restarting application..."
sshpass -p "$SERVER_PASS" ssh -o StrictHostKeyChecking=no -6 \
    "${SERVER_USER}@${SERVER_IP}" \
    "cd ${SERVER_PATH} && pm2 restart atelierkl"

# Health check
echo ""
echo "🏥 Health check..."
sleep 2
HTTP_STATUS=$(sshpass -p "$SERVER_PASS" ssh -o StrictHostKeyChecking=no -6 \
    "${SERVER_USER}@${SERVER_IP}" \
    "curl -s -o /dev/null -w '%{http_code}' http://localhost:3000/")

if [ "$HTTP_STATUS" = "200" ]; then
    echo ""
    echo "============================================"
    echo "✅ Deployment successful! HTTP Status: $HTTP_STATUS"
    echo "============================================"
    echo ""
    echo "🌐 Website: https://atelierkl.de"
else
    echo "❌ Deployment might have issues. HTTP Status: $HTTP_STATUS"
    echo "   Check logs: pm2 logs atelierkl"
    exit 1
fi
