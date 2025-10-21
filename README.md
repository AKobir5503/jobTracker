# 🧠 Job Tracker — Full-Stack CRUD App (FastAPI + React + PostgreSQL + Docker)

A lightweight **Job Application Tracker** that lets you add, update, and manage job applications in one place.  
Built to demonstrate **modern full-stack development skills** — featuring **FastAPI**, **PostgreSQL**, **React**, and **Docker**.

---

## 🚀 What This Project Does

This app helps you track all your job applications easily.  
You can:

- ➕ Add a new job (title, company, status)
- ✏️ Update job status (applied → interview → offer → rejected)
- ❌ Delete jobs you’re done with
- 👀 View all your tracked applications in one dashboard

Everything is fully connected:
- **Frontend:** React (built with Vite, served by Nginx)
- **Backend:** FastAPI (Python)
- **Database:** PostgreSQL
- **Containerized:** Docker Compose connects all 3 services automatically

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
  - Automatic OpenAPI docs at [`/docs`](http://localhost:8000/docs)

- **Frontend**
  - React (Vite) for a fast, modular UI
  - Fetches and displays data from backend API
  - Simple job management form + list interface
  - Served with Nginx inside Docker

- **DevOps**
  - Docker Compose for one-command setup
  - Hot reload support during development
  - Custom Nginx config for API proxying
  - Clean separation between frontend / backend / database services

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
- 🐍 (Optional) Python 3.11+ if you want to run backend manually  
- 🌐 Browser (Chrome, Edge, Safari, etc.)

---

### 2️⃣ Clone the Repository
```bash
git clone https://github.com/<your-username>/job-tracker.git
cd job-tracker

To Run:
docker-compose up --build

Docker will:

Build the backend (FastAPI + dependencies)

Build and serve the frontend (React + Nginx)

Spin up a PostgreSQL database

4️⃣ Open It in Your Browser

Once it finishes, visit:

🌍 Frontend: http://localhost:3000

⚙️ Backend Docs: http://localhost:8000/docs

You’ll see:

A simple UI to add, update, and delete jobs

Real-time updates connected to your FastAPI backend

🧪 Example Usage

Open http://localhost:3000

Add a new job:

Title: Software Engineer

Company: OpenAI

Status: Applied

Click “Add” → instantly appears in list

Update it to “Interview” or “Offer” using the buttons

Delete when done ✅

All changes persist in the PostgreSQL database.

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

🧠 Why This Project Matters

This project demonstrates:

Full-stack architecture from scratch

Real API and database integration

Dockerized multi-service deployment

Ability to design, implement, and run a production-style environment

🧑‍🏫 Author

Kobir
🎯 Full-Stack Developer passionate about simple, functional design

🏁 Future Improvements

Add authentication (e.g. login per user)

Deploy to cloud (Render, Fly.io, or AWS)

Add search/filter for jobs

Export data to CSV

Dark mode UI theme 😎