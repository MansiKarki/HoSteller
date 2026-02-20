import { useEffect, useState } from "react";
import API from "../../api";

export default function MessDetails() {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    API.get("/auth/me").then(res => setStudent(res.data));
  }, []);

  if (!student) return (
    <div className="flex items-center justify-center py-20">
      <p className="text-gray-500">Loading...</p>
    </div>
  );

  const mess = student?.mess;

  const vegMenu = [
    { day: "Monday", breakfast: "Idli & Sambar", lunch: "Dal Rice & Veg Curry", dinner: "Roti & Mixed Veg" },
    { day: "Tuesday", breakfast: "Dosa & Chutney", lunch: "Biryani & Raita", dinner: "Roti & Paneer Curry" },
    { day: "Wednesday", breakfast: "Upma & Tea", lunch: "Dal Makhani & Rice", dinner: "Naan & Vegetable" },
    { day: "Thursday", breakfast: "Poha & Milk", lunch: "Chole Bhature", dinner: "Roti & Spinach Curry" },
    { day: "Friday", breakfast: "Aloo Puri", lunch: "Tomato Rice & Dal", dinner: "Biryani" },
  ];

  const timing = {
    breakfast: "7:00 AM - 9:00 AM",
    lunch: "12:00 PM - 2:00 PM",
    dinner: "7:00 PM - 9:00 PM",
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Mess Details 🍽️</h1>
        <p className="text-gray-500 text-sm mt-0.5">Weekly menu and meal timings</p>
      </div>

      {/* Two Column Layout */}
      <div className="flex gap-6 items-start">

        {/* LEFT — Menu & Details 68% */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8" style={{ flex: "0 0 68%" }}>

          {!mess ? (
            <div className="py-12 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center text-3xl mb-4">⏳</div>
              <h2 className="text-lg font-bold text-gray-700">Not Assigned Yet</h2>
              <p className="text-gray-500 text-sm mt-2">Your mess plan will be assigned soon. Contact the admin for updates.</p>
            </div>
          ) : (
            <div className="space-y-6">

              {/* Mess Info Header */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200 p-6">
                <h2 className="text-xl font-bold text-green-700 mb-4">Your Mess Plan</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl p-4">
                    <p className="text-xs text-gray-400 font-medium mb-1">MESS TYPE</p>
                    <p className="text-lg font-bold text-gray-800">{mess.type || "Vegetarian"}</p>
                  </div>
                  <div className="bg-white rounded-xl p-4">
                    <p className="text-xs text-gray-400 font-medium mb-1">STATUS</p>
                    <p className="text-lg font-bold bg-green-100 text-green-700 inline-block px-3 py-1 rounded-lg">Active</p>
                  </div>
                  <div className="bg-white rounded-xl p-4">
                    <p className="text-xs text-gray-400 font-medium mb-1">MONTHLY COST</p>
                    <p className="text-lg font-bold text-gray-800">₹1,500</p>
                  </div>
                  <div className="bg-white rounded-xl p-4">
                    <p className="text-xs text-gray-400 font-medium mb-1">PAID STATUS</p>
                    <p className="text-lg font-bold text-emerald-600">Paid ✓</p>
                  </div>
                </div>
              </div>

              {/* Meal Timings */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span>⏰</span> Meal Timings
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between bg-blue-50 p-4 rounded-lg">
                    <div>
                      <p className="text-xs text-blue-600 font-bold uppercase">Breakfast</p>
                      <p className="font-semibold text-gray-800">{timing.breakfast}</p>
                    </div>
                    <span className="text-3xl">🥐</span>
                  </div>
                  <div className="flex justify-between bg-green-50 p-4 rounded-lg">
                    <div>
                      <p className="text-xs text-green-600 font-bold uppercase">Lunch</p>
                      <p className="font-semibold text-gray-800">{timing.lunch}</p>
                    </div>
                    <span className="text-3xl">🍛</span>
                  </div>
                  <div className="flex justify-between bg-orange-50 p-4 rounded-lg">
                    <div>
                      <p className="text-xs text-orange-600 font-bold uppercase">Dinner</p>
                      <p className="font-semibold text-gray-800">{timing.dinner}</p>
                    </div>
                    <span className="text-3xl">🍜</span>
                  </div>
                </div>
              </div>

              {/* Weekly Menu */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span>📋</span> Weekly Menu
                </h3>
                <div className="space-y-3">
                  {vegMenu.map((day, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition">
                      <p className="font-bold text-emerald-600 mb-2">{day.day}</p>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div>
                          <p className="text-gray-400 font-medium mb-1">BREAKFAST</p>
                          <p className="text-gray-700 font-medium">{day.breakfast}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 font-medium mb-1">LUNCH</p>
                          <p className="text-gray-700 font-medium">{day.lunch}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 font-medium mb-1">DINNER</p>
                          <p className="text-gray-700 font-medium">{day.dinner}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>

        {/* RIGHT — Info Panel 30% */}
        <div className="flex flex-col gap-4" style={{ flex: "0 0 30%" }}>

          {/* Payment Info */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-bold text-gray-800 text-sm mb-3 flex items-center gap-2">
              <span>💳</span> Payment Info
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between pb-2 border-b border-gray-100">
                <span className="text-gray-400 font-medium">Monthly Fee</span>
                <span className="text-gray-700 font-semibold">₹1,500</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-gray-100">
                <span className="text-gray-400 font-medium">Last Paid</span>
                <span className="text-gray-700 font-semibold">2025-02-01</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 font-medium">Next Due</span>
                <span className="text-gray-700 font-semibold">2025-03-01</span>
              </div>
            </div>
          </div>

          {/* Guidelines */}
          <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-5">
            <h3 className="font-bold text-emerald-800 text-sm mb-3 flex items-center gap-2">
              <span>📍</span> Guidelines
            </h3>
            <ul className="space-y-2 text-xs text-emerald-700">
              <li className="flex gap-2">
                <span>•</span>
                <span>Be on time for meals</span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span>Don't waste food</span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span>Keep dining area clean</span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span>Report any issues to manager</span>
              </li>
            </ul>
          </div>

          {/* Special Notes */}
          <div className="bg-purple-50 rounded-2xl border border-purple-200 p-5">
            <h3 className="font-bold text-purple-800 text-sm mb-3 flex items-center gap-2">
              <span>📌</span> Special Days
            </h3>
            <ul className="space-y-2 text-xs text-purple-700">
              <li className="flex gap-2">
                <span>📅</span>
                <span><b>Sunday:</b> Special Festival Menu</span>
              </li>
              <li className="flex gap-2">
                <span>🎂</span>
                <span><b>Birthday:</b> Special request allowed</span>
              </li>
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
}
