# 📝 Todo Board

A full-stack task management application built with the **MERN stack** featuring real-time updates using **Socket.IO**, smart task assignment, and action logs. Tasks can be created, updated, deleted, and assigned to users, with real-time sync across clients.

## 🚀 Live Demo

- **Frontend**: [View on Vercel](https://todo-board-chi.vercel.app/)
- **Backend**: [Render API Endpoint](https://todo-board-api.onrender.com)

---

## 🛠️ Tech Stack

**Frontend**
- React (Vite)
- Redux Toolkit
- Axios
- Socket.IO Client
- Tailwind CSS / CSS Modules

**Backend**
- Node.js
- Express
- MongoDB + Mongoose
- Socket.IO
- CORS
- Cookie-based authentication

**Deployment**
- Frontend: Vercel
- Backend: Render

---

## 🔑 Features

- 🧾 **User Authentication**
- ✅ **Task Creation & Assignment**
- 🔄 **Real-Time Updates** using Socket.IO
- 🤖 **Smart Assignment** — assign tasks to least busy user
- 📝 **Action Logs** — log all task actions
- 📦 **Responsive UI** for all devices

---

## 📂 Folder Structure
client/ # React frontend (Vite)
```bash
└── src/
└── hooks/
└── components/
└── pages/
└── store/
└── utils/
```
```bash
server/ # Node.js + Express backend
└── controllers/
└── models/
└── routes/
└── middlewares/
└── config/
````

---

## ⚙️ Environment Variables

Create `.env` files in both `client/` and `server/`.

### `.env` (Backend)
```bash
PORT=3000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
````


## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/Biswadip125/Todo_Board
cd Todo_Board
````

Setup Backend
```bash
cd server
npm install
npm start
```
Setup Frontend
```bash
cd client
npm install
npm run dev
````
