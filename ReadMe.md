# 🏨 HoSteller – Student Hostel Management System

HoSteller is a web-based hostel management system designed to manage student authentication, dashboards, and contact handling with an admin backend. 
The project integrates Firebase Authentication for secure login and a backend service for storing contact data.

---

## 🚀 Features

- Student Login & Signup
- Firebase Authentication
- Admin Dashboard
- Contact Form with Backend Storage
- Responsive User Interface
- Secure Authentication Flow

---

## 🛠️ Tech Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js (contact-backend)
- Authentication: Firebase
- Tools: Git, GitHub, VS Code

---


## 📁 Project Structure
```bash
HoSteller/
│── .vscode/
│── assets/
│── contact-backend/
│── firebase-auth.js
│── index.html
│── loginpageA.html
│── loginpageS.html
│── dashboard.html
│── contact.html
│── about.html
│── maintence.html
│── ReadMe.md
```

## 🔥 Firebase Configuration

This project uses Firebase Authentication.

Create a Firebase project from the Firebase Console and enable **Email/Password Authentication**.

### Firebase Config Example
```bash
const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

🔐 Environment Variables
Create a .env file in the root directory (do not commit it to GitHub).
```bash
EMAIL_ID=your_email@gmail.com
EMAIL_APP_PASSWORD=your_app_password
```

1. Clone the repository
```bash
git clone https://github.com/MansiKarki/HoSteller.git
```

2. Open frontend
```bash
Open index.html in browser
```

3 . Start backend
```bash
cd contact-backend
npm install
npm start
```
