
import PageWrapper from "../../components/PageWrapper";

export default function NightOutApprovals({ goBack }) {
  const requests = [
    { id: 1, name: "Sanika Hande", date: "2026-02-10", reason: "Family function" },
    { id: 2, name: "Amit Patil", date: "2026-02-12", reason: "Medical" },
  ];

  return (
    <PageWrapper title="Night Out Approvals" goBack={goBack}>
      {requests.map(req => (
        <RequestCard key={req.id} req={req} />
      ))}
    </PageWrapper>
  );
}

function RequestCard({ req }) {
  return (
    <div className="bg-white p-5 rounded-xl border border-green-100 shadow-sm">
      <h4 className="font-semibold text-green-600">{req.name}</h4>
      <p className="text-gray-600 text-sm">Date: {req.date}</p>
      <p className="text-gray-600 text-sm">Reason: {req.reason}</p>

      <div className="mt-4 flex gap-3">
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg">
          Approve
        </button>
        <button className="px-4 py-2 border border-red-400 text-red-500 rounded-lg">
          Reject
        </button>
      </div>
    </div>
  );
}
