# 🏠 HoSteller - Full Stack Hostel Management System

**HoSteller** is a robust and modern solution for managing university or private hostels. It provides a seamless interface for students to manage their stay and for administrators to oversee operations effectively.

---

## 🏗️ Project Architecture

This is a monorepo containing both the frontend and backend of the application:

- **`/client`**: React + Vite frontend application.
- **`/server`**: Node.js + Express backend with MongoDB.

---

## 🌟 Key Features

### 👨‍🎓 Student Portal
- **ID Card Generation**: Digital ID cards with download functionality.
- **Maintenance Tracking**: Submit and monitor repair requests.
- **Night-Out Management**: Request outing permissions digitally.
- **Mess & Menu**: Stay updated with daily food schedules.
- **Emergency Alerts**: One-tap panic button and contact access.

### 🔑 Admin Portal
- **Dashboard Analytics**: Overview of student data and requests.
- **Registration Approval**: Verify and onboard new students.
- **Hostel Assignment**: Manage room allocations dynamically.
- **Request Oversight**: Approve night-outs and track maintenance progress.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Vite, Tailwind CSS 4, Framer Motion |
| **Backend** | Node.js, Express 5, JWT |
| **Database** | MongoDB, Mongoose |
| **Other** | Axios, Lucide Icons, Nodemailer |

---

## 🚀 Deployment

### 🌐 Backend (Render)
1. **Create a new Web Service** on Render.
2. **Connect your GitHub repository**.
3. **Settings**:
   - **Environment**: `Node`
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. **Environment Variables**:
   - `MONGO_URI`: Your MongoDB connection string.
   - `JWT_SECRET`: A secure random string for tokens.
   - `CLIENT_URL`: Your Vercel frontend URL (e.g., `https://hosteller.vercel.app`).
   - `EMAIL_USER` & `EMAIL_PASS`: Gmail credentials for notifications.

### 💻 Frontend (Vercel)
1. **Create a new Project** on Vercel.
2. **Connect your GitHub repository**.
3. **Settings**:
   - **Root Directory**: `client`
   - **Framework Preset**: `Vite`
4. **Environment Variables**:
   - `VITE_API_URL`: Your Render backend URL + `/api` (e.g., `https://hosteller-api.onrender.com/api`).
5. **Deploy!**

---

## 🎨 Design Philosophy
HoSteller is designed with a **"Student First"** approach, focusing on:
- **Premium Aesthetics**: Clean UI with blue accents and smooth transitions.
- **Accessibility**: Easy navigation for both students and staff.
- **Performance**: Lightweight frontend powered by Vite for instant loading.

---

## 📂 Repository Structure
```text
HoSteller/
├── client/           # React Frontend (Vercel)
├── server/           # Express Backend (Render)
├── package.json      # Monorepo management
└── README.md         # Documentation
```

---

## 📄 License
This project is licensed under the MIT License.
