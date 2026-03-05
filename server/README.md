# 🚀 HoSteller - Backend API

This is the backend server for the HoSteller management system. It provides a RESTful API to handle authentication, student records, maintenance requests, and more.

---

## 🛠️ Tech Stack

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express 5](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **ORM**: [Mongoose](https://mongoosejs.com/)
- **Auth**: [JSON Web Tokens (JWT)](https://jwt.io/) & [BcryptJS](https://github.com/dcodeIO/bcrypt.js)
- **Email**: [Nodemailer](https://nodemailer.com/)

---

## ⚙️ Setup & Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   Create a `.env` file in the `server` directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_app_password
   ```

3. **Run the server**
   - Development mode (with nodemon):
     ```bash
     npm run dev
     ```
   - Production mode:
     ```bash
     npm start
     ```

---

## 📂 API Structure

- `controllers/`: Request handlers and logic.
- `models/`: Mongoose schemas for Students, Admin, Requests, etc.
- `routes/`: Express route definitions.
- `middleware/`: Authentication and error handling.
- `utils/`: Helper functions (e.g., email service).

---

## 🔒 Authentication
The API uses JWT for authorization. Protect routes by including the token in the `Authorization` header:
`Authorization: Bearer <your_token>`
