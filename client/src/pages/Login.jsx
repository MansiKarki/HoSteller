import { useState, useEffect } from "react";
import API from "../api";
import { Eye, EyeOff } from "lucide-react";

export default function Login({ onLogin, initialMode = "login", mode }) {
  const [isLogin, setIsLogin] = useState(initialMode === "login");

  useEffect(() => {
    if (mode) {
      setIsLogin(mode === "login");
    }
  }, [mode]);
  const [role, setRole] = useState("student");
  const [rollNo, setRollNo] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Signup form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [adminId, setAdminId] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validatePassword = (pass) => {
    const minLength = 8;
    const hasUpper = /[A-Z]/.test(pass);
    const hasLower = /[a-z]/.test(pass);
    const hasNumber = /[0-9]/.test(pass);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pass);

    return {
      isValid: pass.length >= minLength && hasUpper && hasLower && hasNumber && hasSpecial,
      checks: {
        length: pass.length >= minLength,
        upper: hasUpper,
        lower: hasLower,
        number: hasNumber,
        special: hasSpecial,
      }
    };
  };

  async function handleLoginSubmit(e) {
    e.preventDefault();

    if (!password) {
      alert("Please enter your password");
      return;
    }

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

    const { isValid } = validatePassword(password);
    if (!isValid) {
      alert("Password is too weak. Please follow the requirements.");
      return;
    }

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
            className={`px-4 py-2 rounded-lg font-medium transition ${isLogin
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-600 hover:bg-gray-300"
              }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => {
              setIsLogin(false);
              setRole("student"); // Ensure only students can signup
            }}
            className={`px-4 py-2 rounded-lg font-medium transition ${!isLogin
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-600 hover:bg-gray-300"
              }`}
          >
            Signup
          </button>
        </div>

        {/* Role Selection (Login Only) */}
        {isLogin && (
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
        )}

        {/* Signup Header (Hidden logic for role) */}
        {!isLogin && (
          <div className="mt-6 bg-green-50 px-4 py-3 rounded-xl border border-green-100">
            <p className="text-xs text-green-700 font-semibold uppercase tracking-wider">Account Type: Student</p>
          </div>
        )}

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
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 pr-12"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-600 transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {!isLogin && password && (
            <div className="mt-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
              <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Password Requirements:</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "8+ Characters", met: validatePassword(password).checks.length },
                  { label: "Uppercase", met: validatePassword(password).checks.upper },
                  { label: "Lowercase", met: validatePassword(password).checks.lower },
                  { label: "Number", met: validatePassword(password).checks.number },
                  { label: "Special Char", met: validatePassword(password).checks.special },
                ].map((req, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full flex items-center justify-center ${req.met ? 'bg-green-500' : 'bg-gray-300'}`}>
                      {req.met && <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" /></svg>}
                    </div>
                    <span className={`text-[10px] sm:text-xs ${req.met ? 'text-green-600 font-medium' : 'text-gray-400'}`}>
                      {req.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Confirm Password Input (Signup only) */}
        {!isLogin && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 pr-12"
                placeholder="Confirm your password"
                required={!isLogin}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-600 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
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
