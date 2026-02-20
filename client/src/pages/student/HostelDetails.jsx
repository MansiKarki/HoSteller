import { useEffect, useState } from "react";
import API from "../../api";

export default function HostelDetails() {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    API.get("/auth/me").then(res => setStudent(res.data));
  }, []);

  if (!student) return (
    <div className="flex items-center justify-center py-20">
      <p className="text-gray-500">Loading...</p>
    </div>
  );

  const hostel = student?.hostel;
  const warden = student?.warden;

  const facilities = [
    "WiFi Internet",
    "24/7 Security",
    "Common Room",
    "Study Area",
    "Laundry Service",
    "Water Cooler",
    "First Aid Kit",
    "CCTV Monitoring",
  ];

  const rules = [
    "Lights-off by 11 PM",
    "No guests after 8 PM",
    "Keep room clean and tidy",
    "Report maintenance issues immediately",
    "Quiet hours: 10 PM - 7 AM",
    "Visitors only in common areas",
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Hostel Details 🏠</h1>
        <p className="text-gray-500 text-sm mt-0.5">Your room information and hostel facilities</p>
      </div>

      {/* Two Column Layout */}
      <div className="flex gap-6 items-start">

        {/* LEFT — Room Details 68% */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8" style={{ flex: "0 0 68%" }}>

          {!hostel ? (
            <div className="py-12 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center text-3xl mb-4">⏳</div>
              <h2 className="text-lg font-bold text-gray-700">Not Assigned Yet</h2>
              <p className="text-gray-500 text-sm mt-2">Your hostel room will be assigned soon. Contact the admin for updates.</p>
            </div>
          ) : (
            <div className="space-y-6">

              {/* Room Card */}
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl border border-green-200 p-6">
                <h2 className="text-xl font-bold text-green-700 mb-4">Your Room</h2>
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-4">
                    <p className="text-xs text-gray-400 font-medium mb-1">HOSTEL NAME</p>
                    <p className="text-lg font-bold text-gray-800">{hostel.name || "Not Assigned"}</p>
                  </div>
                  <div className="bg-white rounded-xl p-4">
                    <p className="text-xs text-gray-400 font-medium mb-1">ROOM NUMBER</p>
                    <p className="text-lg font-bold text-gray-800">{hostel.room || "Not Assigned"}</p>
                  </div>
                  <div className="bg-white rounded-xl p-4">
                    <p className="text-xs text-gray-400 font-medium mb-1">BLOCK</p>
                    <p className="text-lg font-bold text-gray-800">{hostel.block || "Not Assigned"}</p>
                  </div>
                  <div className="bg-white rounded-xl p-4">
                    <p className="text-xs text-gray-400 font-medium mb-1">FLOOR</p>
                    <p className="text-lg font-bold text-gray-800">{hostel.floor || "Not Assigned"}</p>
                  </div>
                </div>
              </div>

              {/* Warden Info */}
              {warden && (
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span>👨‍💼</span> Warden Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-400 font-medium mb-1">NAME</p>
                      <p className="font-semibold text-gray-700">{warden.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium mb-1">PHONE</p>
                      <p className="font-semibold text-gray-700">{warden.phone}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium mb-1">EMAIL</p>
                      <p className="font-semibold text-gray-700 text-sm">{warden.email}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium mb-1">OFFICE HOURS</p>
                      <p className="font-semibold text-gray-700">9 AM - 5 PM</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Facilities Section */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span>⭐</span> Available Facilities
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {facilities.map((facility, idx) => (
                  <div className="flex items-center gap-2 bg-green-50 rounded-lg p-3">
                      <span className="text-lg">✓</span>
                      <span className="text-sm font-medium text-gray-700">{facility}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>

        {/* RIGHT — Rules & Info Panel 30% */}
        <div className="flex flex-col gap-4" style={{ flex: "0 0 30%" }}>

          {/* Quick Stats */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-bold text-gray-800 text-sm mb-3 flex items-center gap-2">
              <span>📊</span> Quick Stats
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between pb-2 border-b border-gray-100">
                <span className="text-gray-400 font-medium">Check-in Date</span>
                <span className="text-gray-700 font-semibold">2025-01-15</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-gray-100">
                <span className="text-gray-400 font-medium">Status</span>
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full font-bold">Active</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 font-medium">Roommates</span>
                <span className="text-gray-700 font-semibold">2</span>
              </div>
            </div>
          </div>

          {/* Hostel Rules */}
          <div className="bg-blue-50 rounded-2xl border border-blue-200 p-5">
            <h3 className="font-bold text-blue-800 text-sm mb-3 flex items-center gap-2">
              <span>📜</span> Hostel Rules
            </h3>
            <ul className="space-y-2 text-xs text-blue-700">
              {rules.map((rule, idx) => (
                <li key={idx} className="flex gap-2 items-start">
                  <span className="font-bold">•</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Emergency Contacts */}
          <div className="bg-red-50 rounded-2xl border border-red-200 p-5">
            <h3 className="font-bold text-red-800 text-sm mb-3 flex items-center gap-2">
              <span>🚨</span> Emergency
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between bg-white p-2 rounded">
                <span className="text-gray-600">Security</span>
                <span className="font-bold text-red-600">+91 9876543210</span>
              </div>
              <div className="flex justify-between bg-white p-2 rounded">
                <span className="text-gray-600">Medical</span>
                <span className="font-bold text-red-600">+91 9876543211</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
