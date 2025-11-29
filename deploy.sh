#!/bin/bash

# ATELIER KL Deployment Script for test-danapfel-digital.de
# This script builds the site and prepares it for PM2 deployment

echo "🎨 ATELIER KL - Building for test-danapfel-digital.de..."

# Set environment
export NODE_ENV=production
export ASTRO_TELEMETRY_DISABLED=1

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Use the local config
echo "🏗️ Building Astro site..."
npm run build -- --config astro.config.local.mjs

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Setup persistent uploads directory
    echo "📂 Setting up uploads directory..."
    mkdir -p uploads
    
    # Create symlink in dist/client
    # Remove existing uploads directory in dist if it exists (it shouldn't, but just in case)
    rm -rf dist/client/uploads
    # Create symlink
    ln -s ../../uploads dist/client/uploads
    
    echo "🔗 Symlinked uploads directory"
    echo ""
    echo "📋 Next steps:"
    echo "1. Start with PM2: pm2 start ecosystem.config.cjs"
    echo "   Or manually: pm2 start dist/server/entry.mjs --name atelieral --interpreter node -- --port=3000 --host=0.0.0.0"
    echo "2. Save PM2 config: pm2 save"
    echo "3. Check status: pm2 status"
    echo "4. View logs: pm2 logs atelieral"
    echo ""
    echo "🌐 Site will be available at: https://test-danapfel-digital.de"
else
    echo "❌ Build failed! Please check the errors above."
    exit 1
fi
