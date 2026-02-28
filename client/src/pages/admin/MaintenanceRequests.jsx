import { useEffect, useState } from "react";
import API from "../../api";

export default function MaintenanceRequests() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/admin/maintenance")
      .then(res => setIssues(res.data))
      .catch(err => {
        console.error("Failed to fetch maintenance requests:", err);
        alert("Failed to load requests. " + (err.response?.data?.message || err.message));
      })
      .finally(() => setLoading(false));
  }, []);

  async function updateStatus(id, status) {
    await API.put(`/admin/maintenance/${id}`, { status });
    setIssues(prev =>
      prev.map(issue => issue._id === id ? { ...issue, status } : issue)
    );
  }

  const statusStyle = {
    "Resolved": "bg-green-100 text-green-600",
    "In Progress": "bg-blue-100 text-blue-600",
    "Pending": "bg-yellow-100 text-yellow-600",
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Maintenance Requests</h1>
        <p className="text-gray-500 mt-1">View and resolve student maintenance issues</p>
      </div>

      {loading ? (
        <div className="bg-white rounded-2xl p-8 text-center text-gray-400 border border-gray-100 shadow-sm">
          Loading requests...
        </div>
      ) : issues.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
          <p className="text-gray-500 font-medium">No maintenance requests found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {issues.map(issue => (
            <div
              key={issue._id}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-green-600">
                    {issue.studentId?.name}
                    {issue.studentId?.rollNo && (
                      <span className="text-gray-400 font-normal text-sm ml-2">
                        ({issue.studentId.rollNo})
                      </span>
                    )}
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">
                    {issue.studentId?.hostel?.name} &middot; Room {issue.studentId?.hostel?.room}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 text-xs rounded-full font-medium whitespace-nowrap ${statusStyle[issue.status] || statusStyle["Pending"]
                    }`}
                >
                  {issue.status}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-xl px-4 py-3">
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Category</p>
                  <p className="text-sm text-gray-700 mt-0.5 font-medium">{issue.category}</p>
                </div>
                <div className="bg-gray-50 rounded-xl px-4 py-3">
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Description</p>
                  <p className="text-sm text-gray-700 mt-0.5">{issue.description}</p>
                </div>
              </div>

              {issue.status !== "Resolved" && (
                <div className="mt-5 flex gap-3">
                  {issue.status !== "In Progress" && (
                    <button
                      onClick={() => updateStatus(issue._id, "In Progress")}
                      className="flex-1 border border-blue-400 text-blue-500 py-2.5 rounded-xl font-medium hover:bg-blue-50 transition text-sm"
                    >
                      Mark In Progress
                    </button>
                  )}
                  <button
                    onClick={() => updateStatus(issue._id, "Resolved")}
                    className="flex-1 bg-green-600 text-white py-2.5 rounded-xl font-medium hover:bg-green-700 transition text-sm"
                  >
                    Mark Resolved
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
