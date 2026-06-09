# 🏋️ GYM Management System

A modern desktop-based Gym Management System built with React, FastAPI, and Electron.

The application helps gym administrators manage members, staff, equipment, and daily operations through a fast, responsive, and user-friendly interface.

---

## 🚀 Features

### 👥 Member Management

- Add new members
- Update member information
- Delete members
- Search and filter members
- View detailed member records

### 👨‍💼 Staff Management

- Create staff profiles
- Edit employee information
- Remove staff records
- Track staff details

### 🏋️ Equipment Management

- Add gym equipment
- Update equipment information
- Remove equipment
- Monitor inventory

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

---

# 🛠️ Tech Stack

## Frontend

- React 19
- Vite
- Tailwind CSS
- shadcn/ui
- Radix UI
- Zustand
- TanStack Query
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

# 📸 Screenshots

## Dashboard

_Add screenshot here_

## Members Management

_Add screenshot here_

## Staff Management

_Add screenshot here_

## Equipment Management

_Add screenshot here_

---

# 🎯 Future Improvements

- Membership Plans
- Attendance Tracking
- QR Code Check-In
- Payment Management
- Reports & Analytics
- Notifications System
- Role-Based Access Control
- PostgreSQL Support

---

# 👩‍💻 Author

### Simav Adnan Mohamed

Computer & Automation Engineer

Frontend & Full-Stack Developer

GitHub:

https://github.com/semav-techdev

---

# 📜 License

This project is licensed under the MIT License.

Feel free to use, modify, and distribute this project.
