#!/bin/bash

# ===========================================
# Hindra Studio - Deployment Script
# ===========================================

set -e

echo "🚀 Hindra Studio Deployment"
echo "==========================="

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Step 1: Create network if not exists
echo -e "${YELLOW}Step 1: Creating Docker network...${NC}"
docker network create web 2>/dev/null || echo "Network 'web' already exists"

# Step 2: Create Traefik directory and acme.json
echo -e "${YELLOW}Step 2: Setting up Traefik...${NC}"
mkdir -p ./traefik
if [ ! -f ./traefik/acme.json ]; then
    touch ./traefik/acme.json
    chmod 600 ./traefik/acme.json
    echo "Created acme.json"
else
    echo "acme.json already exists"
fi

# Step 3: Check .env file
echo -e "${YELLOW}Step 3: Checking environment...${NC}"
if [ ! -f .env ]; then
    echo "⚠️  Warning: .env file not found!"
    echo "   Copy .env.example to .env and fill in your values"
    cp .env.example .env 2>/dev/null || echo "No .env.example found"
fi

# Step 4: Build and start
echo -e "${YELLOW}Step 4: Building and starting services...${NC}"
docker-compose down 2>/dev/null || true
docker-compose build --no-cache
docker-compose up -d

# Step 5: Wait and check
echo -e "${YELLOW}Step 5: Waiting for services to start...${NC}"
sleep 10

# Step 6: Show status
echo -e "${GREEN}✅ Deployment complete!${NC}"
echo ""
docker-compose ps
echo ""
echo "🔍 Checking services..."
echo ""

# Check Traefik
if docker ps | grep -q traefik; then
    echo "✅ Traefik is running"
else
    echo "❌ Traefik is NOT running"
    docker-compose logs traefik --tail=20
fi

# Check Hindra
if docker ps | grep -q hindra; then
    echo "✅ Hindra is running"
else
    echo "❌ Hindra is NOT running"
    docker-compose logs hindra --tail=20
fi

echo ""
echo "🌐 Your site should be available at:"
echo "   https://hindra.studio"
echo ""
echo "📋 Useful commands:"
echo "   docker-compose logs -f        # View logs"
echo "   docker-compose restart        # Restart services"
echo "   docker-compose down           # Stop all"
echo ""

