import { useEffect, useState } from "react";
import API from "../../api";

const statusStyles = {
  Approved: "bg-green-100 text-green-700 border-green-300",
  Rejected: "bg-red-100 text-red-700 border-red-300",
  Pending: "bg-yellow-100 text-yellow-700 border-yellow-300",
};

export default function MyRequests() {
  const [nightOuts, setNightOuts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/student/nightout")
      .then((res) => {
        setNightOuts(res.data || []);
      })
      .catch((error) => {
        console.error("Error fetching night out requests:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-gray-500">Loading your requests...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">My Night Out Requests 🌙</h1>
        <p className="text-gray-500 text-sm mt-0.5">View all your submitted night out requests</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          <p className="text-xs text-gray-400 font-semibold mb-1">TOTAL</p>
          <p className="text-2xl font-bold text-emerald-600">{nightOuts.length}</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          <p className="text-xs text-gray-400 font-semibold mb-1">APPROVED</p>
          <p className="text-2xl font-bold text-green-600">
            {nightOuts.filter(r => r.status === "Approved").length}
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          <p className="text-xs text-gray-400 font-semibold mb-1">PENDING</p>
          <p className="text-2xl font-bold text-green-600">
            {nightOuts.filter(r => r.status === "Pending").length}
          </p>
        </div>
      </div>

      {/* Requests List */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        {nightOuts.length === 0 ? (
          <div className="py-16 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-3xl mb-4">📝</div>
            <h3 className="text-lg font-semibold text-gray-700">No Requests Yet</h3>
            <p className="text-gray-500 text-sm mt-2">You haven't submitted any night out requests</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {nightOuts.map((req) => (
              <div
                key={req._id}
                className="p-6 hover:bg-gray-50 transition flex justify-between items-start"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-gray-800">
                      {new Date(req.date).toLocaleDateString("en-US", {
                        weekday: "short",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </h3>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${statusStyles[req.status] || statusStyles.Pending}`}>
                      {req.status}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mb-3">
                    <strong>Reason:</strong> {req.reason}
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-xs text-gray-400 font-medium mb-1">LEAVING TIME</p>
                      <p className="font-semibold text-gray-700">{req.leaveTime}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium mb-1">RETURN TIME</p>
                      <p className="font-semibold text-gray-700">{req.returnTime}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium mb-1">SUBMITTED</p>
                      <p className="font-semibold text-gray-700">
                        {new Date(req.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium mb-1">CONTACT</p>
                      <p className="font-semibold text-gray-700">{req.parentContact}</p>
                    </div>
                  </div>
                </div>

                {req.status === "Approved" && (
                  <button className="ml-4 px-4 py-2 bg-green-100 text-green-700 font-semibold rounded-lg hover:bg-green-200 transition text-sm whitespace-nowrap">
                    ✓ Approved
                  </button>
                )}
                {req.status === "Rejected" && (
                  <button className="ml-4 px-4 py-2 bg-red-100 text-red-700 font-semibold rounded-lg hover:bg-red-200 transition text-sm whitespace-nowrap">
                    ✗ Rejected
                  </button>
                )}
                {req.status === "Pending" && (
                  <button className="ml-4 px-4 py-2 bg-yellow-100 text-yellow-700 font-semibold rounded-lg hover:bg-yellow-200 transition text-sm whitespace-nowrap">
                    ⏳ Pending
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Info Box */}
        <div className="bg-green-50 rounded-2xl border border-green-200 p-6">
        <h3 className="font-bold text-emerald-800 mb-3 flex items-center gap-2">
          <span>💡</span> Quick Info
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-emerald-700 font-medium">Max per Month</p>
            <p className="font-bold text-emerald-900">2 requests</p>
          </div>
          <div>
            <p className="text-emerald-700 font-medium">Approval Time</p>
            <p className="font-bold text-emerald-900">24-48 hours</p>
          </div>
          <div>
            <p className="text-emerald-700 font-medium">Return Deadline</p>
            <p className="font-bold text-emerald-900">Before 10 PM</p>
          </div>
        </div>
      </div>

    </div>
  );
}
