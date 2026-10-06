# HireFlow — Find work that moves you

<div align="center">

![HireFlow](https://img.shields.io/badge/HireFlow-Job%20Portal-0A84FF?style=for-the-badge&logo=react&logoColor=white)

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Local%2FAtlas-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

</div>

HireFlow is a modern full-stack job portal that connects job seekers with companies through a smooth and responsive hiring experience. Candidates can discover roles, apply quickly, and track progress, while recruiters can post jobs and manage applicants from one dashboard.

## ✨ Why HireFlow

- Clean, modern job-search experience
- Candidate and recruiter split flows
- Secure JWT authentication and protected routes
- Simple recruiter dashboard for managing applications
- Ready for portfolio, demo, and learning use

## 🧩 Tech Stack

- Frontend: React, Vite, React Router, Axios
- Backend: Node.js, Express, MongoDB, Mongoose
- Auth: JWT + bcryptjs
- UI: Responsive custom CSS

## 🏗️ Project Structure

```text
HireFlow/
├── client/                 # React frontend
│   ├── src/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── server/                 # Express backend
│   ├── src/
│   ├── test/
│   └── package.json
├── .gitignore
├── README.md
├── install.bat
├── start.bat
├── package.json
└── package-lock.json
```

## 🚀 Local Setup

### Prerequisites

- Node.js 18+
- MongoDB running locally or MongoDB Atlas configured
- VS Code

### Quick Start

1. Open the project folder in VS Code.
2. Run:

```bash
npm install
npm run install:all
```

3. Copy the environment file:

```bash
copy server\.env.example server\.env
```

4. Update `server/.env`:

```env
PORT=5000
NODE_ENV=development
JWT_SECRET=your_secure_secret
CLIENT_URL=http://127.0.0.1:5173
ALLOW_RECRUITER_REGISTRATION=true
```

5. Start the app:

```bash
start.bat
```

6. Open:

- Frontend: http://127.0.0.1:5173
- Backend: http://127.0.0.1:5000/api/health

## 🔐 Demo Credentials

### Recruiter
- Email: recruiter@careerhub.local
- Password: recruiter123

### Candidate
- Create a new account from the register screen

## 🧪 Features Included

- Job listings with filters
- Job detail page
- Candidate application flow
- Recruiter job posting flow
- Application status updates
- JWT auth with protected routes
- Demo data seeding for quick testing

## 📚 API Overview

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/jobs`
- `GET /api/jobs/:id`
- `POST /api/jobs` (recruiter)
- `GET /api/applications/candidate/mine`
- `GET /api/applications/recruiter/mine`
- `PATCH /api/applications/:id/status`

## 🛠️ Notes

This project is built as a polished portfolio/demo app. It is suitable for learning and showcasing MERN stack skills, and it includes working auth, dashboards, and backend validation flow.

## 👨‍💻 Project Goal

To demonstrate a complete full-stack job portal experience with a clean UI, role-based access, and real working API integration.
