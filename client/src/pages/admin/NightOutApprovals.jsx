import { useEffect, useState } from "react";
import PageWrapper from "../../components/PageWrapper";
import API from "../../api";

export default function NightOutApprovals({ goBack }) {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  async function fetchRequests() {
    try {
      const res = await API.get("/admin/nightout");
      setRequests(res.data);
    } catch (error) {
      console.error("Error fetching night out requests:", error);
    }
  }

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
      {requests.length === 0 ? (
        <div className="bg-white p-8 rounded-2xl shadow-sm text-center text-gray-500">
          No pending night out requests.
        </div>
      ) : (
        <div className="space-y-6">
          {requests.map(req => (
            <RequestCard
              key={req._id}
              req={req}
              updateStatus={updateStatus}
            />
          ))}
        </div>
      )}
    </PageWrapper>
  );
}

function RequestCard({ req, updateStatus }) {
  return (
    <div className="
      bg-white 
      p-6 
      rounded-2xl 
      border border-green-100 
      shadow-sm 
      hover:shadow-md 
      transition-all 
      duration-200
    ">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-lg font-semibold text-green-600">
            {req.studentId?.name || req.name}
          </h4>

          <p className="text-gray-500 text-sm mt-1">
            Date: {req.date}
          </p>

          <p className="text-gray-600 text-sm mt-1">
            Reason: {req.reason}
          </p>
        </div>

        <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-600 font-medium">
          Pending
        </span>
      </div>

      <div className="mt-6 flex gap-4">
        <button
          onClick={() => updateStatus(req._id, "Approved")}
          className="
            flex-1
            bg-green-600 
            text-white 
            py-2 
            rounded-xl 
            font-medium 
            hover:bg-green-700 
            transition
          "
        >
          Approve
        </button>

        <button
          onClick={() => updateStatus(req._id, "Rejected")}
          className="
            flex-1
            border border-red-400 
            text-red-500 
            py-2 
            rounded-xl 
            font-medium 
            hover:bg-red-50 
            transition
          "
        >
          Reject
        </button>
      </div>
    </div>
  );
}
