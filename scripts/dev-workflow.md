# Development Workflow

## 🚀 Quick Start

### For Development (Hot Reload)
```bash
# Terminal 1: Start backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Terminal 2: Start frontend
cd frontend
npm install
npm run dev
```
**Access**: http://localhost:5173

### For Production (Docker)
```bash
# Build and start all services
docker-compose up --build -d
```
**Access**: http://localhost:3000

## 🔄 Syncing Development → Production

When you make changes in development and want to update production:

```bash
# 1. Build the frontend
cd frontend
npm run build

# 2. Rebuild Docker containers
cd ..
docker-compose down
docker-compose up --build -d
```

## 📁 Project Structure

- **Port 5173**: Development server (hot reload, live changes)
- **Port 3000**: Production server (Docker, optimized build)
- **Port 8000**: Backend API (both dev and prod)

## 🎯 Best Practices

1. **Develop on port 5173** - instant feedback
2. **Test on port 3000** - production-like environment
3. **Deploy with Docker** - consistent across environments
4. **Always run `npm run build`** before Docker rebuild
