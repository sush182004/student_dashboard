# student_dashboard🎓 Student Feedback System (MERN Stack)
📌 Project Overview

This is a MERN stack application where students can register, log in, submit feedback on courses, and manage their profile.
Admins can manage courses, view analytics, and monitor student feedback with role-based access control (RBAC).

## 🛠️ Tech Stack
Frontend: React, React Router, Axios, Chart.js.  
Backend: Node.js, Express.js, MongoDB, JWT, Bcrypt.  
Database: Local MongoDB

## Backend setup
cd backend.  
npm install.  
npm run dev.  
### Backend will run at: http://localhost:5000.  

## Frontend setup
cd ../frontend.  
npm install.  
npm start.  
### Frontend will run at: http://localhost:3000.  

.

## 🔑 Test Logins
After running node seed.js, you can log in with:
Admin Login.  
Email: admin@example.com.  
Password: Admin@123.  

Student Login.  
Email: student@example.com.  
Password: Student@123.  

student/.  
│. 
├─ backend/.
│   ├─ models/.         # Mongoose models (User, Course, Feedback)
│   ├─ routes/.         # Express routes (auth, users, courses, feedback)
│   ├─ middleware/.      # Auth & Admin middleware
│   ├─ seed.js.          # Database seeding script
│   ├─ server.js.        # Express app entry
│   ├─ .env.example.     # Sample backend environment variables
│   └─ package.json.  
│.  
├─ frontend/.  
│   ├─ src/.             # React components & pages
│   ├─ public/.  
│   ├─ .env.example.      # Sample frontend environment variables
│   └─ package.json.  
│.  
└─ README.md.  
