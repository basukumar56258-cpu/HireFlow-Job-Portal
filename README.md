# HireFlow — MERN Job Portal

A full-stack job portal built with MongoDB, Express, React, and Node.js.

## Features
- Candidate and recruiter registration/login with JWT authentication
- Browse and search jobs by title, location, and employment type
- Candidates can apply for jobs and track application status
- Recruiters can create, edit, and delete their own job listings
- Recruiter dashboard with job and application counts
- Protected API routes and password hashing
- Responsive UI with demo-friendly sample job listings when the database is empty

## Tech stack
- Frontend: React, Vite, React Router, Axios, Lucide React
- Backend: Node.js, Express, MongoDB/Mongoose, JWT, bcryptjs
- API: REST

## Requirements
Node.js 18+ and MongoDB (local or MongoDB Atlas).

## Run in VS Code
1. Extract the ZIP and open the `HireFlow` folder in VS Code.
2. Copy `server/.env.example` to `server/.env`.
3. Add your MongoDB connection string and a long JWT secret in `server/.env`.
4. Open a terminal in the project folder and run:
   ```bash
   npm install
   npm run install:all
   npm run dev
   ```
5. Open the frontend URL printed by Vite (usually `http://localhost:5173`).

Backend runs on `http://localhost:5000`.

## Environment
`server/.env`
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/hireflow
JWT_SECRET=replace_with_a_long_random_secret
CLIENT_URL=http://localhost:5173
```

## API overview
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/jobs`
- `GET /api/jobs/:id`
- `POST /api/jobs` (recruiter)
- `PUT /api/jobs/:id` (job owner)
- `DELETE /api/jobs/:id` (job owner)
- `POST /api/jobs/:id/apply` (candidate)
- `GET /api/applications/mine` (candidate)
- `GET /api/applications/recruiter` (recruiter)

## Notes
This is a portfolio starter, not a production-hardened deployment. Before production, add email verification, password reset, rate limiting, audit logging, file upload scanning, automated tests, and deployment secrets management.
