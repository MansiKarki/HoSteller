import { useState } from "react";
import API from "../../api";

const categories = [
  "Electrical",
  "Plumbing",
  "Furniture",
  "Cleaning",
  "Internet / WiFi",
  "Door & Lock",
  "Window & Glass",
  "Other",
];

const currentIssues = [
  { category: "Electrical", status: "Resolved", date: "2025-02-15" },
  { category: "WiFi", status: "In Progress", date: "2025-02-10" },
];

const statusStyles = {
  Pending: "bg-yellow-100 text-yellow-700",
  "In Progress": "bg-blue-100 text-blue-700",
  Resolved: "bg-green-100 text-green-700",
  Closed: "bg-gray-100 text-gray-700",
};

function Input({ label, ...props }) {
  return (
<<<<<<< main
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
        {label}
      </label>
      <input
        {...props}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition placeholder-gray-400"
      />
    </div>
  );
}
=======
    <div className="min-h-screen bg-[#F3FAED] flex items-center justify-center px-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full">

        {/* Back Button */}
        <button
          onClick={goBack}
          className="text-green-600 text-sm mb-4 hover:underline"
        >
          ← Back to Dashboard
        </button>

        <h2 className="text-2xl font-bold text-green-600 text-center">
          Maintenance Request
        </h2>

        <p className="text-center text-gray-500 mt-1">
          Report hostel room or facility issues
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">

            <Select
              label="Issue Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select a category</option>
              <option value="Electrical">Electrical</option>
              <option value="Plumbing">Plumbing</option>
              <option value="Furniture">Furniture</option>
              <option value="Cleaning">Cleaning</option>
              <option value="Internet / WiFi">Internet / WiFi</option>
              <option value="Other">Other</option>
            </Select>

            <Textarea
              label="Issue Description"
              placeholder="Describe the issue in detail..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full mt-4 py-3 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition"
            >
              Submit Request
            </button>
          </form>
        ) : (
          <div className="mt-8 text-center">
            <p className="text-green-600 font-semibold text-lg">
              Maintenance Request Submitted ✅
            </p>
            <p className="text-gray-500 mt-2">
              Our team will look into it shortly
            </p>
          </div>
        )}
>>>>>>> main

function Textarea({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
        {label}
      </label>
      <textarea
        {...props}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition placeholder-gray-400 resize-none"
        rows="5"
      />
    </div>
  );
}

function Select({ label, children, ...props }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
        {label}
      </label>
      <select
<<<<<<< main
=======
        className="w-full px-4 py-2 border border-gray-300 rounded-xl
          focus:outline-none focus:ring-2 focus:ring-green-400"
        required
>>>>>>> main
        {...props}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
      >
        {children}
      </select>
    </div>
  );
}

export default function Maintenance() {
  const [submitted, setSubmitted] = useState(false);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [priority, setPriority] = useState("Medium");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await API.post("/student/maintenance", {
        category,
        description,
        location,
        priority,
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting maintenance request:", error);
    }
  }

  return (
<<<<<<< main
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Maintenance Request 🔧</h1>
        <p className="text-gray-500 text-sm mt-0.5">Report hostel issues and request maintenance</p>
      </div>

      {/* Two Column Layout */}
      <div className="flex gap-6 items-start">

        {/* LEFT — Form 68% */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8" style={{ flex: "0 0 68%" }}>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <Select
                label="Issue Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </Select>

              <Input
                label="Location in Room"
                placeholder="e.g., Bathroom, Bedroom, Kitchen, Corridor"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />

              <Textarea
                label="Describe the Issue"
                placeholder="Provide detailed description... Be specific about what's wrong and when it started."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />

              <Select
                label="Priority Level"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="Low">🟢 Low - Not urgent</option>
                <option value="Medium">🟡 Medium - Should be fixed soon</option>
                <option value="High">🔴 High - Urgent</option>
              </Select>

              <button
                type="submit"
                className="w-full py-3.5 bg-green-600 hover:bg-green-700 text-white font-bold text-base rounded-xl transition-colors duration-200"
              >
                Submit Maintenance Request
              </button>
            </form>
          ) : (
            <div className="py-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-3xl mb-4">✅</div>
              <p className="text-green-600 font-bold text-xl">Request Submitted Successfully!</p>
              <p className="text-gray-400 text-sm mt-2">Our maintenance team will schedule a visit shortly</p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setCategory("");
                  setDescription("");
                  setLocation("");
                  setPriority("Medium");
                }}
                className="mt-6 px-6 py-2.5 bg-slate-800 text-white text-sm font-semibold rounded-xl hover:bg-slate-700 transition"
              >
                ← Back to Form
              </button>
            </div>
          )}
        </div>

        {/* RIGHT — Info Panel 30% */}
        <div className="flex flex-col gap-4" style={{ flex: "0 0 30%" }}>

          {/* Tips */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-bold text-gray-800 text-sm mb-3 flex items-center gap-2">
              <span>💡</span> Helpful Tips
            </h3>
            <ul className="space-y-2.5 text-xs text-gray-600">
              <li className="flex gap-2">
                <span>✓</span>
                <span>Be specific about location</span>
              </li>
              <li className="flex gap-2">
                <span>✓</span>
                <span>Include when issue started</span>
              </li>
              <li className="flex gap-2">
                <span>✓</span>
                <span>Use clear description</span>
              </li>
              <li className="flex gap-2">
                <span>✓</span>
                <span>Urgent issues get priority</span>
              </li>
            </ul>
          </div>

          {/* Current Issues */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-bold text-gray-800 text-sm mb-3 flex items-center gap-2">
              <span>🔍</span> Your Active Issues
            </h3>
            <div className="space-y-2">
              {currentIssues.length === 0 ? (
                <p className="text-xs text-gray-400 italic">No active maintenance requests</p>
              ) : (
                currentIssues.map((issue, idx) => (
                  <div key={idx} className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-xs font-bold text-gray-700">{issue.category}</p>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${statusStyles[issue.status]}`}>
                        {issue.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">{issue.date}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Support Info */}
          <div className="bg-green-50 rounded-2xl border border-green-200 p-5">
            <h3 className="font-bold text-green-800 text-sm mb-3 flex items-center gap-2">
              <span>📞</span> Need Help?
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between bg-white p-2 rounded">
                <span className="text-gray-600">Urgent Issues</span>
                <span className="font-bold text-green-600">+91 9876543210</span>
              </div>
              <div className="flex justify-between bg-white p-2 rounded">
                <span className="text-gray-600">Warden Office</span>
                <span className="font-bold text-green-600">+91 9876543211</span>
              </div>
            </div>
          </div>

        </div>

      </div>

=======
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">
        {label}
      </label>
      <textarea
        rows="4"
        className="w-full px-4 py-2 border border-gray-300 rounded-xl
          focus:outline-none focus:ring-2 focus:ring-green-400"
        {...props}
      />
>>>>>>> main
    </div>
  );
}