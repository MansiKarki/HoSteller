import { useState } from "react";
import API from "../../api";

const sidebarItems = [
  { id: "nightout", title: "Night Out", description: "Apply for permission" },
  { id: "hostel", title: "Hostel Details", description: "Room & facilities" },
  { id: "mess", title: "Mess Details", description: "Menu & timings" },
  { id: "maintenance", title: "Maintenance", description: "Raise issues" },
  { id: "status", title: "Request Status", description: "Track approvals" },
  { id: "id", title: "Digital ID Card", description: "View & download" },
];

const guidelines = [
  "Return before 10 PM",
  "Maximum 2 night outs per month",
  "Parent contact must be valid",
  "Late return may lead to disciplinary action",
];

const currentStatus = {
  status: "Pending",
  submittedDate: "2025-02-18",
  approvedBy: null,
};

const studentInfo = {
  hostelName: "Block A",
  roomNumber: "Room 204",
  wardenName: "Mr. Ramesh Kumar",
};

const statusStyles = {
  Pending: "bg-yellow-100 text-yellow-700",
  Approved: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
};

function Input({ label, ...props }) {
  return (
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

export default function NightOut({ setPage }) {
  const [submitted, setSubmitted] = useState(false);
  const [date, setDate] = useState("");
  const [leaveTime, setLeaveTime] = useState("");
  const [returnTime, setReturnTime] = useState("");
  const [reason, setReason] = useState("");
  const [parentContact, setParentContact] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    
    // Submit to API
    API.post("/student/nightout", {
      date,
      leaveTime,
      returnTime,
      reason,
    })
    .then(() => {
      setSubmitted(true);
    })
    .catch((error) => {
      console.error("Error submitting night out request:", error);
      alert("Failed to submit request. Please try again.");
    });
  }

  return (
    <div className="space-y-6">

          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Night Out Request 🌙</h1>
            <p className="text-gray-500 text-sm mt-0.5">Fill the form to request night out permission</p>
          </div>

          {/* Two Column Layout */}
          <div className="flex gap-6 items-start">

            {/* LEFT — Form 70% */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8" style={{ flex: "0 0 68%" }}>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <Input label="Date" type="date" required value={date} onChange={(e) => setDate(e.target.value)} />

                  <div className="grid grid-cols-2 gap-4">
                    <Input label="Leaving Time" type="time" required value={leaveTime} onChange={(e) => setLeaveTime(e.target.value)} />
                    <Input label="Return Time" type="time" required value={returnTime} onChange={(e) => setReturnTime(e.target.value)} />
                  </div>

                  <Input label="Reason" placeholder="Family function, medical, etc." required value={reason} onChange={(e) => setReason(e.target.value)} />
                  <Input label="Parent Contact Number" type="tel" placeholder="Enter contact number" required value={parentContact} onChange={(e) => setParentContact(e.target.value)} />

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-green-600 hover:bg-green-700 text-white font-bold text-base rounded-xl transition-colors duration-200"
                  >
                    Submit Request
                  </button>
                </form>
              ) : (
                <div className="py-10 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-3xl mb-4">✅</div>
                  <p className="text-green-600 font-bold text-xl">Request Submitted Successfully!</p>
                  <p className="text-gray-400 text-sm mt-2">Waiting for admin approval</p>
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => setPage && setPage("status")}
                      className="px-6 py-2.5 bg-green-600 text-white text-sm font-semibold rounded-xl hover:bg-green-700 transition"
                    >
                      📊 View Request Status
                    </button>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setDate("");
                        setLeaveTime("");
                        setReturnTime("");
                        setReason("");
                        setParentContact("");
                      }}
                      className="px-6 py-2.5 bg-slate-800 text-white text-sm font-semibold rounded-xl hover:bg-slate-700 transition"
                    >
                      ➕ Submit Another
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT — Info Panel 30% */}
            <div className="flex flex-col gap-4" style={{ flex: "0 0 30%" }}>

              {/* Guidelines */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-bold text-gray-800 text-sm mb-3 flex items-center gap-2">
                  <span>📋</span> Night Out Guidelines
                </h3>
                <ul className="space-y-2.5">
                  {guidelines.map((g, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-500">
                      <span className="mt-0.5 w-4 h-4 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-[10px] font-bold shrink-0">
                        {i + 1}
                      </span>
                      {g}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Request Status */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-bold text-gray-800 text-sm mb-3 flex items-center gap-2">
                  <span>🌙</span> Current Request Status
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400 font-medium">Status</span>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full bg-green-100 text-green-700`}>
                      {currentStatus.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400 font-medium">Submitted</span>
                    <span className="text-xs text-gray-700 font-semibold">{currentStatus.submittedDate || "-"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400 font-medium">Approved By</span>
                    <span className="text-xs text-gray-700 font-semibold">{currentStatus.approvedBy || "-"}</span>
                  </div>
                </div>
              </div>

              {/* Student Info */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-bold text-gray-800 text-sm mb-3 flex items-center gap-2">
                  <span>👤</span> Student Info
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400 font-medium">Hostel</span>
                    <span className="text-xs text-gray-700 font-semibold">{studentInfo.hostelName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400 font-medium">Room</span>
                    <span className="text-xs text-gray-700 font-semibold">{studentInfo.roomNumber}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400 font-medium">Warden</span>
                    <span className="text-xs text-gray-700 font-semibold">{studentInfo.wardenName}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

    </div>
  );
}

