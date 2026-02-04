import { useState } from "react";
import API from "../api";

export default function Login({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState("student");
  const [rollNo, setRollNo] = useState("");
  const [password, setPassword] = useState("");
  
  // Signup form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [adminId, setAdminId] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleLoginSubmit(e) {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        role,
        rollNo: role === "student" ? rollNo : undefined,
        adminId: role === "admin" ? adminId : undefined,
        password,
      });

      localStorage.setItem("token", res.data.token);
      onLogin(role);
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  }

  async function handleSignupSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const signupData = {
        role,
        name,
        email,
        password,
      };

      if (role === "student") {
        signupData.rollNo = rollNo;
      } else {
        signupData.adminId = adminId;
      }

      const res = await API.post("/auth/signup", signupData);

      alert(res.data.message || "Signup successful! Please login.");
      setIsLogin(true);
      // Clear form
      setName("");
      setEmail("");
      setRollNo("");
      setAdminId("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F3FAED] px-6">
      <form
        onSubmit={isLogin ? handleLoginSubmit : handleSignupSubmit}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full"
      >
        <h2 className="text-2xl font-bold text-center text-green-600">
          {isLogin ? "Hosteller Login" : "Hosteller Signup"}
        </h2>

        <p className="text-center text-gray-500 mt-2">
          {isLogin ? "Choose your role to continue" : "Create your account"}
        </p>

        {/* Toggle between Login and Signup */}
        <div className="mt-4 flex gap-4 justify-center">
          <button
            type="button"
            onClick={() => setIsLogin(true)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              isLogin
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setIsLogin(false)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              !isLogin
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
            }`}
          >
            Signup
          </button>
        </div>

        {/* Role Selection */}
        <div className="mt-6 space-y-3">
          <label className="flex items-center gap-3 border rounded-xl p-3 cursor-pointer hover:border-green-400">
            <input
              type="radio"
              value="student"
              checked={role === "student"}
              onChange={() => setRole("student")}
            />
            Student
          </label>

          <label className="flex items-center gap-3 border rounded-xl p-3 cursor-pointer hover:border-green-400">
            <input
              type="radio"
              value="admin"
              checked={role === "admin"}
              onChange={() => setRole("admin")}
            />
            Admin / Warden
          </label>
        </div>

        {/* Name Input (Signup only) */}
        {!isLogin && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter your full name"
              required={!isLogin}
            />
          </div>
        )}

        {/* Email Input (Signup only) */}
        {!isLogin && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter your email"
              required={!isLogin}
            />
          </div>
        )}

        {/* Roll No / Admin ID Input */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {role === "student" ? "Roll No" : "Admin ID"}
          </label>
          <input
            type="text"
            value={role === "student" ? rollNo : adminId}
            onChange={(e) =>
              role === "student" ? setRollNo(e.target.value) : setAdminId(e.target.value)
            }
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder={role === "student" ? "Enter your roll no" : "Enter admin ID"}
            required
          />
        </div>

        {/* Password Input */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Enter your password"
            required
          />
        </div>

        {/* Confirm Password Input (Signup only) */}
        {!isLogin && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Confirm your password"
              required={!isLogin}
            />
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="w-full mt-6 py-3 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition"
        >
          {isLogin ? "Login" : "Signup"}
        </button>
      </form>
    </div>
  );
}
