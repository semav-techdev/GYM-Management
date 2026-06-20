# 🏋️ GYM Management System

A modern desktop-based Gym Management System built with React, FastAPI, and Electron.

The application helps gym administrators manage members, staff, equipment, plan and daily operations through a fast, responsive, and user-friendly interface.

---

# 🎥 Demo Video:

[Watch Here](./demo/dashboard.mp4)

## 🚀 Features

### 👥 Member Management

- Add new members
- Update member information
- Delete members
- Search and filter members
- View detailed member records
- Track members weight monthly

### 👨‍💼 Staff Management

- Add staff members
- Edit staff information
- Remove staff records
- Track member weight progress monthly

### 🏋️ Equipment Management

- Add gym equipment
- Update equipment information
- Remove equipment
- Monitor inventory

### 🚀 Plan & Price

- Create membership plans and pricing
- Edit and delete plans

### 🔐 Authentication

- Secure login system
- Protected routes
- Session management

### 📊 Dashboard

- Overview of gym operations
- Quick access to key statistics
- Modern responsive interface

### 🖥️ Desktop Application

- Built using Electron
- Cross-platform desktop support
- Native application experience

### Web Application

---

# 🛠️ Tech Stack

## Frontend

- React 19
- Vite
- Tailwind CSS
- shadcn/ui
- Zustand
- Axios
- React Router DOM
- Lucide React

## Backend

- FastAPI
- Python
- SQLite

## Desktop

- Electron

---

# 📁 Project Structure

```text
GYM-Management/
│
├── backend/
│   ├── app/
│   │   └── main.py
│   ├── gym_dashboard.db
│   ├── .env
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── electron/
│
└── README.md
```

---

# ⚙️ Installation

## 1. Clone Repository

```bash
git clone https://github.com/semav-techdev/GYM-Management.git

cd GYM-Management
```

---

## 2. Backend Setup

Navigate to backend:

```bash
cd backend
```

Create virtual environment:

```bash
python -m venv venv
```

Activate virtual environment:

### Windows

```bash
venv\Scripts\activate
```

### Linux / Mac

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run FastAPI server:

```bash
uvicorn app.main:app --reload
```

Backend URL:

```text
http://127.0.0.1:8000
```

API Documentation:

```text
http://127.0.0.1:8000/docs
```

---

## 3. Frontend Setup

Navigate to frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

---

# 🔧 Environment Variables

Create a `.env` file inside the backend directory.

Example:

```env
SECRET_KEY=your_secret_key

DATABASE_URL=sqlite:///gym_dashboard.db
```

---

# 🎯 Future Improvements

- QR Code Check-In
- Payment Management
- Reports & Analytics
- Role-Based Access Control
- PostgreSQL Support

---

# 👩‍💻 Author

### Simav Adnan Mohamed

Computer & Automation Engineer

React Frontend & Python Backend Developer

GitHub:

https://github.com/semav-techdev

---

# 📜 License

This project is licensed under the MIT License.

Feel free to use, modify, and distribute this project.
