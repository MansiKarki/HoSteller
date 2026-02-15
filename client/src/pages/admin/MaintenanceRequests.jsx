import { useEffect, useState } from "react";
import API from "../../api";

export default function MaintenanceRequests({ goBack }) {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    API.get("/admin/maintenance")
      .then(res => {
        setIssues(res.data);
      })
      .catch(err => {
        console.error("Failed to fetch maintenance requests:", err);
        alert("Failed to load requests. " + (err.response?.data?.message || err.message));
      });
  }, []);

  async function updateStatus(id, status) {
    await API.put(`/admin/maintenance/${id}`, { status });
    setIssues(prev =>
      prev.map(issue =>
        issue._id === id ? { ...issue, status } : issue
      )
    );
  }

  return (
    <div className="min-h-screen bg-[#F3FAED] p-6">
      <button onClick={goBack} className="text-green-600 mb-4">
        ← Back to Dashboard
      </button>

      <h2 className="text-2xl font-bold text-green-600 mb-6">
        Maintenance Requests
      </h2>

      <div className="space-y-4">
        {issues.map(issue => (
          <div
            key={issue._id}
            className="bg-white p-5 rounded-2xl border border-green-100 shadow"
          >
            <h3 className="font-semibold text-green-600">
              {issue.studentId?.name} ({issue.studentId?.rollNo})
            </h3>

            <p className="text-gray-600 text-sm">
              Hostel: {issue.studentId?.hostel?.name} · Room {issue.studentId?.hostel?.room}
            </p>

            <p className="text-gray-600 text-sm">
              Category: {issue.category}
            </p>

            <p className="text-gray-600 text-sm">
              Issue: {issue.description}
            </p>

            <p className="mt-2 font-medium">
              Status:
              <span
  className={`px-3 py-1 rounded-full text-sm ${
    issue.status === "Resolved"
      ? "bg-green-100 text-green-600"
      : issue.status === "In Progress"
      ? "bg-blue-100 text-blue-600"
      : "bg-yellow-100 text-yellow-600"
  }`}
>
  {issue.status}
</span>

            </p>

            {issue.status !== "Resolved" && (
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() =>
                    updateStatus(issue._id, "In Progress")
                  }
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  In Progress
                </button>

                <button
                  onClick={() =>
                    updateStatus(issue._id, "Resolved")
                  }
                  className="px-4 py-2 bg-green-600 text-white rounded-lg"
                >
                  Mark Resolved
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
