import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "Put api key heree",
  authDomain: "Put auth domain here",
  projectId: "Put project id here",
  appId: "put app id here"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 👁 Password toggle (already in your UI)
window.togglePassword = function () {
  const pwd = document.getElementById("password");
  pwd.type = pwd.type === "password" ? "text" : "password";
};

// 🔐 LOGIN / AUTO-SIGNUP LOGIC
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    // 1️⃣ Try normal login
    await signInWithEmailAndPassword(auth, email, password);
    alert("Login successful");
    window.location.href = "dashboard.html";

  } catch (error) {
    // 2️⃣ If user not found → auto create
    if (
      error.code === "auth/user-not-found" ||
      error.code === "auth/invalid-credential"
    ) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Account created & logged in");
        window.location.href = "Sdashboard.html";
      } catch (signupError) {
        alert(signupError.message);
      }
    } else {
      alert(error.message);
    }
  }
});