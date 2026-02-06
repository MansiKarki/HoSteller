import { useState } from "react";
import API from "../../api";

export default function NightOut({ goBack }) {
  const [submitted, setSubmitted] = useState(false);
  const [date, setDate] = useState("");
  const [leaveTime, setLeaveTime] = useState("");
  const [returnTime, setReturnTime] = useState("");
  const [reason, setReason] = useState("");
    const [parentContact, setParentContact] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    await API.post("/student/nightout", {
      date,
      leaveTime,
      returnTime,
      reason,
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
          Night Out Request
        </h2>

        <p className="text-center text-gray-500 mt-1">
          Fill the form to request night out permission
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <Input label="Date" type="date" required value={date} onChange={e => setDate(e.target.value)}/>
            <Input label="Leaving Time" type="time" required value={leaveTime} onChange={e => setLeaveTime(e.target.value)}/>
            <Input label="Return Time" type="time" required value={returnTime} onChange={e => setReturnTime(e.target.value)}/>
            <Input
              label="Reason"
              placeholder="Family function, medical, etc."
              required
              value={reason} onChange={e => setReason(e.target.value)}
            />
            <Input
              label="Parent Contact Number"
              type="tel"
              placeholder="Enter contact number"
              required
              value={parentContact} onChange={e => setParentContact(e.target.value)}
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
              Request Submitted Successfully ✅
            </p>
            <p className="text-gray-500 mt-2">Waiting for admin approval</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* Reusable Input Component */
function Input({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">
        {label}
      </label>
      <input
        {...props}
        className="w-full px-4 py-2 border border-gray-300 rounded-xl
          focus:outline-none focus:ring-2 focus:ring-green-400"
      />
    </div>
  );
}
