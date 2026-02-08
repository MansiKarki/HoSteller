import { useState } from "react";
import PageWrapper from "../../components/PageWrapper";
import API from "../../api"; // make sure this path is correct

export default function NightOutApprovals({ goBack }) {
  const [requests, setRequests] = useState([
    { _id: 1, name: "Sanika Hande", date: "2026-02-10", reason: "Family function" },
    { _id: 2, name: "Amit Patil", date: "2026-02-12", reason: "Medical" },
  ]);

  async function updateStatus(id, status) {
    try {
      await API.put(`/admin/nightout/${id}`, { status });

      setRequests(prev =>
        prev.filter(req => req._id !== id)
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  }

  return (
    <PageWrapper title="Night Out Approvals" goBack={goBack}>
      {requests.map(req => (
        <RequestCard
          key={req._id}
          req={req}
          updateStatus={updateStatus}
        />
      ))}
    </PageWrapper>
  );
}

function RequestCard({ req, updateStatus }) {
  return (
    <div className="bg-white p-5 rounded-xl border border-green-100 shadow-sm">
      <h4 className="font-semibold text-green-600">{req.name}</h4>
      <p className="text-gray-600 text-sm">Date: {req.date}</p>
      <p className="text-gray-600 text-sm">Reason: {req.reason}</p>

      <div className="mt-4 flex gap-3">
        <button onClick={() => updateStatus(req._id, "Approved")}>
          Approve
        </button>

        <button onClick={() => updateStatus(req._id, "Rejected")}>
          Reject
        </button>
      </div>
    </div>
  );
}
