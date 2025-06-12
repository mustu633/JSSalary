# 💼 JSSalary — Salary Status Management (MERN)

A full-stack **MERN** application to manage employee salary data. Users can upload Excel files containing employee and salary details, which are automatically parsed and stored in a **MongoDB Atlas** cloud database. Additionally, the UI allows for **adding**, **editing**, and **deleting** individual employee and salary records.

---

## 🚀 Features

- Bulk import employee and salary data from Excel files  
- Create, read, update, delete (CRUD) individual records  
- React-based frontend with intuitive UI  
- Express/Mongoose backend API with MongoDB Atlas  
- Secure configuration via `.env` (database URI & secret keys hidden)

---

## 🛠️ Quickstart



set this in your .env :

TOKEN_KEY=YOUR_TOKEN_KEY
ATLASDB_URL=YOUR_ATLAS_URL
SECRET=YOUR_SECRETE

-------------------------------------------------------------

### 🔧 Backend
npm start
Create a .env file in backend/ (not tracked in Git):

-----------------------------------------------------------------

⚙️ Frontend
cd frontend
npm start

------------------------------------------------------------

📁 Project Structure

JSSalary/
├── backend/      # Node.js + Express + Mongoose API
├── frontend/     # React application

The UI processes the file and imports the data automatically.

------------------------------------------------------------

🔐 Security & Configuration
.env is listed in .gitignore to keep credentials secure

MongoDB Atlas hosts your database securely

No sensitive information is stored in the repository

-------------------------------------------------------------------------

📦 Technology Stack
Frontend: React, Axios

Backend: Node.js, Express, Mongoose

Database: MongoDB Atlas

Extras: xlsx, express-fileupload, dotenv, nodemon

----------------------------------------------------------------------------

👤 Author
Ghulam Mustafa
GitHub: [mustu633](https://github.com/mustu633)

--------------------------------------------------------------------

✅ Usage Summary
Upload salary data via Excel

Manage individual records

Run backend with npm start (in /backend)

Run frontend with npm start (in /frontend)

Leverage MongoDB Atlas for cloud storage

Keep .env private for security
