import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";
import { Eye, EyeOff, CheckCircle } from "lucide-react";

export default function ResetPassword() {
    const { resetToken, role } = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

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

    const handleResetSubmit = async (e) => {
        e.preventDefault();
        const { isValid } = validatePassword(password);
        if (!isValid) {
            alert("Password must meet the required complexity.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        setLoading(true);
        try {
            const res = await API.put(`/auth/reset-password/${resetToken}`, {
                password,
                role
            });
            setIsSuccess(true);
            setTimeout(() => navigate("/"), 3000);
        } catch (error) {
            alert(error.response?.data?.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F3FAED] px-6">
                <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
                    <div className="flex justify-center mb-4">
                        <CheckCircle className="text-green-500 w-16 h-16" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Password Updated!</h2>
                    <p className="text-gray-500 mt-2">Your password has been reset successfully. Redirecting you to login...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F3FAED] px-6">
            <form onSubmit={handleResetSubmit} className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
                <div className="flex flex-col items-center mb-6">
                    <img src="/logo.png" alt="HoSteller Logo" className="w-16 h-16 mb-2" />
                    <h2 className="text-2xl font-bold text-center text-green-600">Reset Password</h2>
                </div>
                <p className="text-center text-gray-500 mb-6 font-medium">Choose a strong new password</p>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 pr-12"
                                placeholder="Enter new password"
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

                        {password && (
                            <div className="mt-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
                                <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Requirements:</p>
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

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 pr-12"
                                placeholder="Confirm new password"
                                required
                            />
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full mt-6 py-3 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {loading ? "Updating..." : "Reset Password"}
                </button>
            </form>
        </div>
    );
}
