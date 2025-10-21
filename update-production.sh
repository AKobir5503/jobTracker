#!/bin/bash

echo "🚀 Updating production build..."

# Build frontend
echo "📦 Building frontend..."
cd frontend
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Frontend built successfully"
else
    echo "❌ Frontend build failed"
    exit 1
fi

# Go back to root
cd ..

# Rebuild Docker containers
echo "🐳 Rebuilding Docker containers..."
docker-compose down
docker-compose up --build -d

if [ $? -eq 0 ]; then
    echo "✅ Production updated successfully!"
    echo "🌐 Frontend: http://localhost:3000"
    echo "🔧 Backend: http://localhost:8000"
else
    echo "❌ Docker rebuild failed"
    exit 1
fi
