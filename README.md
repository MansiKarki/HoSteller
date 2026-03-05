# 🏠 HoSteller - Frontend

HoSteller is a modern, full-stack Hostel Management System designed to streamline the experience for both students and administrators. This repository contains the frontend application built with **React**, **Vite**, and **Tailwind CSS**.

---

## ✨ Features

### 👨‍🎓 For Students
- **Dashboard**: Quick overview of status, mess menu, and announcements.
- **ID Card**: Generate and download your digital hostel ID card.
- **Maintenance**: Raise and track maintenance requests with real-time updates.
- **Night-Out Requests**: Submit digital night-out permissions for approval.
- **Mess Details**: View daily mess schedules and menu updates.
- **Emergency**: Quick access to emergency contacts and panic alerts.
- **Status Tracking**: Monitor hostel stay duration, attendance, and dues.

### 🔑 For Admins
- **Admin Dashboard**: Comprehensive analytics and student statistics.
- **Student Verification**: Approve or reject new student registrations.
- **Hostel Allocation**: Dynamic room and hostel assignment management.
- **Maintenance Management**: Review and resolve student complaints.
- **Night-Out Approvals**: Seamlessly manage and approve outing requests.

---

## 🚀 Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: [React Router 7](https://reactrouter.com/)
- **API Client**: [Axios](https://axios-http.com/)
- **Exports**: [jsPDF](https://github.com/parallax/jsPDF) & [html2canvas](https://html2canvas.hertzen.com/) (For ID Cards)

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/HoSteller.git
   cd HoSteller/client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Environment Variables**
   Create a `.env` file in the root of the `client` directory:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

---

## 📂 Project Structure

```text
client/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Main application pages (Admin/Student modules)
│   ├── assets/         # Images and static files
│   ├── api.js          # API configuration
│   ├── App.jsx         # Root component & Routing
│   └── index.css       # Global styles & Tailwind config
├── public/             # Static assets
└── vite.config.js      # Vite configuration
```

---

## 🎨 UI & UX
HoSteller features a premium, responsive design with:
- **Glassmorphism** effects for a modern feel.
- **Dynamic Animations** using Framer Motion.
- **Responsive Layouts** optimized for mobile and desktop.
- **Blue-focused Theme** for a professional and trustworthy aesthetic.

---

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.
