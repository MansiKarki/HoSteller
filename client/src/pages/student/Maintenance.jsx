import { useState } from "react";
import API from "../../api";

export default function Maintenance({ goBack }) {
  const [submitted, setSubmitted] = useState(false);
  const [category, setCategory] = useState("");
const [description, setDescription] = useState("");


  async function handleSubmit(e) {
  e.preventDefault();

  await API.post("/student/maintenance", {
    category,
    description,
  });

  setSubmitted(true);
}

  return (
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

            <Select label="Issue Category">
              <option>Electrical</option>
              <option>Plumbing</option>
              <option>Furniture</option>
              <option>Cleaning</option>
              <option>Internet / WiFi</option>
              <option>Other</option>
            </Select>

            <Textarea
              label="Issue Description"
              placeholder="Describe the issue in detail..."
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

      </div>
    </div>
  );
}

function Select({ label, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">
        {label}
      </label>
      <select
        className="w-full px-4 py-2 border border-gray-300 rounded-xl
          focus:outline-none focus:ring-2 focus:ring-green-400"
        required
      >
        {children}
      </select>
    </div>
  );
}

function Textarea({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">
        {label}
      </label>
      <textarea
        {...props}
        rows="4"
        className="w-full px-4 py-2 border border-gray-300 rounded-xl
          focus:outline-none focus:ring-2 focus:ring-green-400"
      />
    </div>
  );
}
