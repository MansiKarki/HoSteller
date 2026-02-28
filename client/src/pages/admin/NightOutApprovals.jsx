import { useEffect, useState } from "react";
import API from "../../api";

export default function NightOutApprovals() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  async function fetchRequests() {
    try {
      const res = await API.get("/admin/nightout");
      setRequests(res.data);
    } catch (error) {
      console.error("Error fetching night out requests:", error);
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id, status) {
    try {
      await API.put(`/admin/nightout/${id}`, { status });
      setRequests(prev => prev.filter(req => req._id !== id));
    } catch (error) {
      console.error("Error updating status:", error);
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Night Out Approvals</h1>
        <p className="text-gray-500 mt-1">Approve or reject student night out requests</p>
      </div>

      {loading ? (
        <div className="bg-white rounded-2xl p-8 text-center text-gray-400 border border-gray-100 shadow-sm">
          Loading requests...
        </div>
      ) : requests.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
          <p className="text-gray-500 font-medium">No pending night out requests</p>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map(req => (
            <div
              key={req._id}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-semibold text-green-600">
                    {req.studentId?.name || req.name}
                  </h4>
                  <p className="text-gray-400 text-sm mt-1">Date: {req.date}</p>
                  <p className="text-gray-600 text-sm mt-1">Reason: {req.reason}</p>
                </div>
                <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-600 font-medium whitespace-nowrap">
                  Pending
                </span>
              </div>

              <div className="mt-5 flex gap-3">
                <button
                  onClick={() => updateStatus(req._id, "Approved")}
                  className="flex-1 bg-green-600 text-white py-2.5 rounded-xl font-medium hover:bg-green-700 transition text-sm"
                >
                  Approve
                </button>
                <button
                  onClick={() => updateStatus(req._id, "Rejected")}
                  className="flex-1 border border-red-400 text-red-500 py-2.5 rounded-xl font-medium hover:bg-red-50 transition text-sm"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
