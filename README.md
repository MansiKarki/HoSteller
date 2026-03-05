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

## �️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Vite, Tailwind CSS 4, Framer Motion |
| **Backend** | Node.js, Express 5, JWT |
| **Database** | MongoDB, Mongoose |
| **Other** | Axios, Lucide Icons, Nodemailer |

---

## � Quick Start

### 1. Clone the Project
```bash
git clone https://github.com/your-username/HoSteller.git
cd HoSteller
```

### 2. Setup Server
1. Navigate to server: `cd server`
2. Install dependencies: `npm install`
3. Configure `.env`:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_app_password
   ```
4. Start server: `npm run dev`

### 3. Setup Client
1. Open a new terminal and navigate to client: `cd client`
2. Install dependencies: `npm install`
3. Configure `.env`:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```
4. Start client: `npm run dev`

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
├── client/           # React Frontend
├── server/           # Express Backend
└── package.json      # (Optional) Root scripts
```

---

## 📄 License
This project is licensed under the MIT License.
