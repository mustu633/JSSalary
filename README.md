JSSalary — Salary Status Management (MERN)

A full-stack MERN application to manage employee salary data.

Users can:

Upload Excel files containing employee and salary details

Automatically parse and store data in local MongoDB

Add, edit, and delete individual employee and salary records

-------------------------------------------------------------------------------------------------------------------------------------------------------

Features

Bulk import employee and salary data from Excel files

Create, read, update, delete (CRUD) individual records

React-based frontend with simple UI

Express/Mongoose backend API with local MongoDB

Secure configuration via .env file (database URI & secret keys hidden)

-------------------------------------------------------------------------------------------------------------------------------------------------------

Quickstart
Backend Setup

Create a .env file inside backend/ folder:

TOKEN_KEY
DB_URL
SECRET


Install backend dependencies:

cd backend
npm install


Start backend server:

npm start

-------------------------------------------------------------------------------------------------------------------------------------------------------

Frontend Setup

Install frontend dependencies:

cd frontend
npm install

-------------------------------------------------------------------------------------------------------------------------------------------------------

Start frontend server:

npm start

-------------------------------------------------------------------------------------------------------------------------------------------------------

Security & Configuration

.env is included in .gitignore to keep credentials secure

No sensitive information is stored in the repository

-------------------------------------------------------------------------------------------------------------------------------------------------------

Technology Stack

Frontend: React, Axios

Backend: Node.js, Express, Mongoose

Database: MongoDB (local)

Extras: xlsx, express-fileupload, dotenv, nodemon

-------------------------------------------------------------------------------------------------------------------------------------------------------

Author

Ghulam Mustafa
GitHub: mustu633
