# 🧠 Job Tracker — Professional Job Application Management

A **professional-grade job application tracker** with advanced table management, filtering, sorting, and bulk operations.  
Built with **FastAPI**, **PostgreSQL**, **React**, and **Docker** for modern full-stack development.

---

## 🚀 What This Project Does

This app provides a **professional interface** for managing job applications at scale.  
You can:

- ➕ **Add new jobs** (title, company, status)
- 🔍 **Search & filter** across all job data
- 📊 **Sort by any column** (title, company, status)
- ✅ **Bulk operations** (select multiple jobs, update status, delete)
- ✏️ **Update job status** (applied → interview → offer → rejected)
- ❌ **Delete individual or multiple jobs**
- 📱 **Responsive design** that works on all devices

**Professional Features:**
- **Table-based interface** for efficient data management
- **Real-time search** across job titles and companies
- **Status filtering** to focus on specific application stages
- **Bulk selection** for managing multiple applications
- **Sortable columns** for organizing your data
- **Mobile-responsive** design for on-the-go management

**Architecture:**
- **Frontend:** React with Vite (development) + Nginx (production)
- **Backend:** FastAPI with async Python
- **Database:** PostgreSQL with SQLAlchemy ORM
- **Containerized:** Docker Compose for easy deployment

---

## 🧩 Architecture Overview

[ React Frontend (Nginx) ]
│
▼
[ FastAPI Backend ]
│
▼
[ PostgreSQL Database ]


**Flow:**
1. The **frontend** runs in a Node build environment, then served by Nginx.  
   It sends API requests like `GET /jobs` or `POST /jobs` to the backend.
2. The **backend** (FastAPI) receives these requests, performs CRUD operations,
   and communicates with the **PostgreSQL** database via SQLAlchemy.
3. Everything runs inside **Docker containers**, orchestrated with `docker-compose`.

---

## 🛠️ Technical Features

- **Backend**
  - FastAPI for high-performance async API endpoints
  - SQLAlchemy ORM for interacting with PostgreSQL
  - Pydantic models for request/response validation
  - Full CRUD routes (`GET`, `POST`, `PUT`, `DELETE`)
  - CORS middleware for cross-origin requests
  - Automatic OpenAPI docs at [`/docs`](http://localhost:8000/docs)

- **Frontend**
  - React with Vite for fast development and building
  - Professional table-based UI with advanced features
  - Real-time search and filtering capabilities
  - Sortable columns with visual indicators
  - Bulk selection and operations
  - Responsive design for mobile and desktop
  - Hot reload support during development
  - Served with Nginx in production

- **Database**
  - PostgreSQL for reliable data persistence
  - SQLAlchemy ORM for type-safe database operations
  - Automatic table creation and migrations
  - Connection pooling for optimal performance

- **DevOps & Deployment**
  - Docker Compose for one-command setup
  - Multi-stage Docker builds for optimization
  - Custom Nginx configuration for API proxying
  - Environment-based configuration
  - Production-ready containerization
  - Easy scaling and deployment

---

## 🧰 Tech Stack

| Layer | Tech |
|-------|------|
| **Frontend** | React, Vite, Nginx |
| **Backend** | FastAPI, Python 3.11 |
| **Database** | PostgreSQL |
| **Containerization** | Docker, Docker Compose |

---

## 🧑‍💻 How To Run It (Step-By-Step)

### 1️⃣ Prerequisites
Make sure you have:
- 🐳 [Docker Desktop](https://www.docker.com/products/docker-desktop) installed  
- 🐍 (Optional) Python 3.11+ and Node.js 18+ for development
- 🌐 Modern browser (Chrome, Edge, Safari, Firefox)

---

### 2️⃣ Clone the Repository
```bash
git clone https://github.com/<your-username>/job-tracker.git
cd job-tracker
```

---

### 3️⃣ Quick Start (Production)
```bash
# Start all services with Docker
docker-compose up --build -d

# Check if everything is running
docker-compose ps
```

**Access the application:**
- 🌍 **Frontend**: http://localhost:3000
- ⚙️ **Backend API**: http://localhost:8000
- 📚 **API Documentation**: http://localhost:8000/docs

---

### 4️⃣ Development Mode (Optional)
For development with hot reload:

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

**Development URLs:**
- 🌍 **Frontend (Dev)**: http://localhost:5173
- ⚙️ **Backend**: http://localhost:8000

---

### 5️⃣ Using the Application

**Adding Jobs:**
1. Fill in Job Title, Company, and select Status
2. Click "Add Job" to save

**Managing Jobs:**
- **Search**: Use the search box to find specific jobs
- **Filter**: Select status from dropdown to filter results
- **Sort**: Click column headers to sort by title, company, or status
- **Bulk Actions**: Select multiple jobs using checkboxes, then use bulk action buttons
- **Individual Actions**: Use action buttons on each row to update status or delete

**Example Workflow:**
1. Add "Software Engineer" at "Google" with status "Applied"
2. Search for "Google" to find it quickly
3. Filter by "Applied" to see all pending applications
4. Select multiple jobs and bulk update to "Interview"
5. Sort by company name to organize alphabetically

🧱 Folder Structure
job-tracker/
├── backend/
│   ├── main.py          # FastAPI app + routes
│   ├── crud.py          # DB operations
│   ├── models.py        # SQLAlchemy models
│   ├── schemas.py       # Pydantic validation
│   └── database.py      # DB connection
│
├── frontend/
│   ├── src/             # React app (App.jsx, components)
│   ├── public/          # Static files
│   ├── nginx.conf       # Custom proxy config
│   ├── package.json
│   └── Dockerfile
│
├── docker-compose.yml
└── README.md

---

## ⚡ Quick Reference

### Essential Commands

```bash
# Start everything (production)
docker-compose up --build -d

# Stop everything
docker-compose down

# View logs
docker-compose logs -f

# Rebuild after changes
docker-compose up --build

# Development mode
cd frontend && npm run dev
cd backend && uvicorn main:app --reload
```

### URLs
- **Production Frontend**: http://localhost:3000
- **Development Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

---

## 🔧 Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Stop existing containers
docker-compose down

# Check what's using the ports
lsof -i :3000 -i :8000 -i :5432
```

**Backend not starting:**
```bash
# Check backend logs
docker-compose logs backend

# Install dependencies manually
cd backend
pip install -r requirements.txt
```

**Frontend not updating:**
```bash
# Rebuild frontend
cd frontend
npm run build

# Rebuild Docker containers
docker-compose up --build -d
```

**Database connection issues:**
```bash
# Check database logs
docker-compose logs db

# Restart database
docker-compose restart db
```

---

## 🧠 Why This Project Matters

This project demonstrates:

- **Full-stack architecture** from scratch
- **Real API and database integration** with proper error handling
- **Dockerized multi-service deployment** with orchestration
- **Professional UI/UX** with advanced data management features
- **Production-ready** containerization and deployment
- **Modern development practices** with hot reload and type safety

---

## 🧑‍🏫 Author

**Kobir**  
🎯 Full-Stack Developer passionate about simple, functional design and professional user experiences

---

## 🏁 Future Improvements

- [ ] **User Authentication** (login per user, JWT tokens)
- [ ] **Cloud Deployment** (Render, Fly.io, or AWS)
- [ ] **Data Export** (CSV, PDF reports)
- [ ] **Advanced Filtering** (date ranges, salary, location)
- [ ] **Email Notifications** (status change alerts)
- [ ] **Dark Mode** UI theme 😎
- [ ] **Mobile App** (React Native)
- [ ] **Analytics Dashboard** (application statistics)
- [ ] **API Rate Limiting** and security enhancements
- [ ] **Database Migrations** and versioning