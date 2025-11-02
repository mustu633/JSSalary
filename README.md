JSSalary — Salary Status Management (MERN)

A full-stack MERN application to manage employee salary data. Users can upload Excel files containing employee and salary details, which are automatically parsed and stored in a local MongoDB database. The UI also allows adding, editing, and deleting individual employee and salary records.

Features

Bulk import employee and salary data from Excel files

Create, read, update, delete (CRUD) individual records

React-based frontend with simple UI

Express/Mongoose backend API with local MongoDB

Secure configuration via .env file (database URI & secret keys hidden)

Quickstart
Backend

Create a .env file inside backend/ folder with the following:

TOKEN_KEY=YOUR_TOKEN_KEY
DB_URL=YOUR_LOCAL_MONGODB_URL
SECRET=YOUR_SECRET_KEY


Install dependencies:

cd backend
npm install


Start backend server:

npm start

Frontend

Install dependencies:

cd frontend
npm install


Start frontend server:

npm start

Project Structure
JSSalary/
├── backend/      # Node.js + Express + Mongoose API
├── frontend/     # React application


The UI processes Excel files and imports data automatically.

Local MongoDB is used to store employee and salary data.

Security & Configuration

.env is listed in .gitignore to keep credentials secure.

No sensitive information is stored in the repository.

Technology Stack

Frontend: React, Axios

Backend: Node.js, Express, Mongoose

Database: MongoDB (local)

Extras: xlsx, express-fileupload, dotenv, nodemon

Author

Ghulam Mustafa
GitHub: mustu633

Usage Summary

Upload salary data via Excel

Manage individual employee and salary records

Run backend: npm start in /backend

Run frontend: npm start in /frontend

Keep .env private for security
