# LeadFlow CRM

A full-stack Lead Management application developed as part of the **Digital Heroes Training Task**.

LeadFlow CRM allows businesses to capture leads through a public landing page and manage them securely through an authenticated admin dashboard.

---

# Features

## Public Landing Page

- Responsive landing page
- Lead capture form
- Client-side validation
- Server-side validation
- Budget range selection
- Stores leads in MongoDB Atlas
- Success notification after submission

## Admin Dashboard

- Secure JWT Authentication
- Login system
- View all submitted leads
- Search leads
- Edit lead details
- Delete leads
- Update lead status (New / Contacted / Closed)
- Dashboard statistics
- Responsive Material UI interface

---

# Tech Stack

## Frontend

- React.js
- Vite
- Material UI
- Axios
- React Router DOM

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcryptjs

---

# Project Structure

```
LeadFlowCRM
│
├── client
│   ├── src
│   ├── public
│   ├── package.json
│   └── ...
│
├── server
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── app.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── README.md
└── .gitignore
```

---

# Authentication

The admin dashboard uses **JWT (JSON Web Token)** authentication.

Features include:

- Secure password hashing using **bcryptjs**
- JWT token generation after login
- Protected API routes
- Role-based authorization
- Passwords are never returned in API responses

---

# Database Models

## User

| Field | Type |
|-------|------|
| Name | String |
| Email | String |
| Password | Hashed String |
| Role | String |

## Lead

| Field | Type |
|-------|------|
| Name | String |
| Email | String |
| Phone | String |
| Company | String |
| Budget Range | String |
| Message | String |
| Status | String |
| Created At | Date |

---

# Installation

## Clone Repository

```bash
git clone https://github.com/gayathri28-lang/LeadFlowCRM.git
```

## Backend

```bash
cd server
npm install
npm start
```

## Frontend

```bash
cd client
npm install
npm run dev
```

---

# Environment Variables

Create a `.env` file inside the **server** folder.

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

# Test Credentials

## Admin Login

**Email**

```
admin@leadflow.com
```

**Password**

```
Admin@123
```

---

# Live Demo

## Landing Page

```
(Add your deployed Landing Page URL here)
```

## Admin Dashboard

```
(Add your deployed Admin URL here)
/admin
```

## GitHub Repository

https://github.com/gayathri28-lang/LeadFlowCRM

---

# AI Usage

AI assistance was used during development for:

- UI design improvements
- React component generation
- Code refactoring
- Debugging backend and frontend issues
- Authentication improvements
- Error handling
- Documentation drafting

All AI-generated suggestions were carefully reviewed, modified where necessary, integrated into the project, and tested before submission.

---

# Author

**Gayathri Sudheesh**

B.Tech Computer Science and Engineering

GitHub:
https://github.com/gayathri28-lang

---

# Built For

**Digital Heroes Training Task**

https://digitalheroesco.com
