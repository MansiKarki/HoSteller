import { useEffect, useState } from "react";
import API from "../../api";

export default function MyStatus({ goBack }) {
  const [nightOuts, setNightOuts] = useState([]);
  const [maintenance, setMaintenance] = useState([]);

  useEffect(() => {
    API.get("/student/nightout").then(res => {
      setNightOuts(res.data);
    });

    API.get("/student/maintenance").then(res => {
      setMaintenance(res.data);
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#F3FAED] p-6">
      <button onClick={goBack} className="text-green-600 mb-4">
        ← Back to Dashboard
      </button>

      <h2 className="text-3xl font-bold text-green-600 mb-6">
        My Requests Status
      </h2>

      {/* Night Out Section */}
      <Section title="Night Out Requests">
        {nightOuts.length === 0 ? (
          <Empty text="No night out requests yet" />
        ) : (
          nightOuts.map(req => (
            <Card key={req._id}>
              <p><b>Date:</b> {req.date}</p>
              <p><b>Reason:</b> {req.reason}</p>

              {/* ✅ Only ONE status badge */}
              <StatusBadge status={req.status} />
            </Card>
          ))
        )}
      </Section>

      {/* Maintenance Section */}
      <Section title="Maintenance Requests">
        {maintenance.length === 0 ? (
          <Empty text="No maintenance requests yet" />
        ) : (
          maintenance.map(issue => (
            <Card key={issue._id}>
              <p><b>Category:</b> {issue.category}</p>
              <p><b>Issue:</b> {issue.description}</p>

              {/* ✅ Only ONE status badge */}
              <StatusBadge status={issue.status} />
            </Card>
          ))
        )}
      </Section>
    </div>
  );
}

/* ---------- UI Components ---------- */

function Section({ title, children }) {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold text-green-600 mb-3">
        {title}
      </h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Card({ children }) {
  return (
    <div className="bg-white p-4 rounded-xl border border-green-100 shadow-sm">
      {children}
    </div>
  );
}

function Empty({ text }) {
  return (
    <p className="text-gray-500 italic bg-white p-4 rounded-xl border">
      {text}
    </p>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Approved: "bg-green-100 text-green-600",
    Rejected: "bg-red-100 text-red-500",
    Pending: "bg-yellow-100 text-yellow-600",
    Open: "bg-yellow-100 text-yellow-600",
    "In Progress": "bg-blue-100 text-blue-600",
    Resolved: "bg-green-100 text-green-600",
  };

  return (
    <span
      className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${
        styles[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
}
