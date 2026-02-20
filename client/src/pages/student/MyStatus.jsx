import { useEffect, useState } from "react";
import API from "../../api";

const statusStyles = {
  Approved: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Open: "bg-yellow-100 text-yellow-700",
  "In Progress": "bg-blue-100 text-blue-700",
  Resolved: "bg-green-100 text-green-700",
  Closed: "bg-gray-100 text-gray-700",
};

export default function MyStatus() {
  const [nightOuts, setNightOuts] = useState([]);
  const [maintenance, setMaintenance] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [noRes, maintRes] = await Promise.all([
        API.get("/student/nightout"),
        API.get("/student/maintenance"),
      ]);
      setNightOuts(noRes.data || []);
      setMaintenance(maintRes.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
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
        <h1 className="text-2xl font-bold text-gray-800">My Request Status 📊</h1>
        <p className="text-gray-500 text-sm mt-0.5">Track the status of all your hostel requests</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          <p className="text-xs text-gray-400 font-semibold mb-1">NIGHT OUT</p>
          <p className="text-2xl font-bold text-emerald-600">{nightOuts.length}</p>
          <p className="text-xs text-gray-500 mt-1">Total requests</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          <p className="text-xs text-gray-400 font-semibold mb-1">MAINTENANCE</p>
          <p className="text-2xl font-bold text-blue-600">{maintenance.length}</p>
          <p className="text-xs text-gray-500 mt-1">Total requests</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          <p className="text-xs text-gray-400 font-semibold mb-1">PENDING</p>
            <p className="text-2xl font-bold text-green-600">
            {[...nightOuts, ...maintenance].filter(r => r.status === "Pending").length}
          </p>
          <p className="text-xs text-gray-500 mt-1">Awaiting approval</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          <p className="text-xs text-gray-400 font-semibold mb-1">APPROVED</p>
          <p className="text-2xl font-bold text-green-600">
            {[...nightOuts, ...maintenance].filter(r => r.status === "Approved").length}
          </p>
          <p className="text-xs text-gray-500 mt-1">Completed</p>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="flex gap-6 items-start">

        {/* LEFT — Requests List 68% */}
        <div style={{ flex: "0 0 68%" }}>

          {/* Night Out Section */}
          <Section title="🌙 Night Out Requests">
            {nightOuts.length === 0 ? (
              <Empty text="No night out requests yet. Submit one to get started!" />
            ) : (
              <div className="space-y-3">
                {nightOuts.map((req) => (
                  <Card key={req._id}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold text-gray-800">{req.date}</p>
                        <p className="text-sm text-gray-500">{req.reason}</p>
                      </div>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${statusStyles[req.status] || statusStyles.Pending}`}>
                        {req.status}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Time: {req.leaveTime} - {req.returnTime}</span>
                      <span>Submitted: {new Date(req.createdAt).toLocaleDateString()}</span>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </Section>

          {/* Maintenance Section */}
          <Section title="🔧 Maintenance Requests">
            {maintenance.length === 0 ? (
              <Empty text="No maintenance requests yet. Report an issue to get started!" />
            ) : (
              <div className="space-y-3">
                {maintenance.map((issue) => (
                  <Card key={issue._id}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-lg">
                            {issue.category}
                          </span>
                          <p className="font-semibold text-gray-800">{issue.location}</p>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{issue.description}</p>
                      </div>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap ml-2 ${statusStyles[issue.status] || statusStyles.Open}`}>
                        {issue.status}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Priority: <strong>{issue.priority}</strong></span>
                      <span>Submitted: {new Date(issue.createdAt).toLocaleDateString()}</span>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </Section>

        </div>

        {/* RIGHT — Info Panel 30% */}
        <div className="flex flex-col gap-4" style={{ flex: "0 0 30%" }}>

          {/* Legend */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-bold text-gray-800 text-sm mb-3 flex items-center gap-2">
              <span>📜</span> Status Legend
            </h3>
            <div className="space-y-2">
              {Object.entries(statusStyles).map(([status, style]) => (
                <div key={status} className="flex items-center gap-2">
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${style}`}>
                    {status}
                  </span>
                  <span className="text-xs text-gray-600">
                    {status === "Pending" && "Awaiting Review"}
                    {status === "Approved" && "Approved"}
                    {status === "Rejected" && "Declined"}
                    {status === "In Progress" && "Being Worked On"}
                    {status === "Resolved" && "Fixed"}
                    {status === "Closed" && "Closed"}
                    {status === "Open" && "Submitted"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline Tips */}
          <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-5">
            <h3 className="font-bold text-emerald-800 text-sm mb-3 flex items-center gap-2">
              <span>⏱️</span> Expected Timeline
            </h3>
            <ul className="space-y-2 text-xs text-emerald-700">
              <li className="flex gap-2">
                <span>📌</span>
                <span><b>Night Out:</b> 24-48 hours</span>
              </li>
              <li className="flex gap-2">
                <span>🔧</span>
                <span><b>Maintenance:</b> 3-5 days</span>
              </li>
              <li className="flex gap-2">
                <span>🚨</span>
                <span><b>Urgent:</b> 24 hours</span>
              </li>
            </ul>
          </div>

          {/* Contact Support */}
          <div className="bg-blue-50 rounded-2xl border border-blue-200 p-5">
            <h3 className="font-bold text-blue-800 text-sm mb-3 flex items-center gap-2">
              <span>📞</span> Need Help?
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Warden</span>
                <span className="font-bold text-blue-600">+91 9876543210</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Admin</span>
                <span className="font-bold text-blue-600">+91 9876543211</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-bold text-gray-800 mb-4">
        {title}
      </h2>
      {children}
    </div>
  );
}

function Card({ children }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 hover:shadow-md transition">
      {children}
    </div>
  );
}

function Empty({ text }) {
  return (
    <div className="bg-white p-8 rounded-xl border border-gray-200 text-center">
      <p className="text-gray-400 italic text-sm">{text}</p>
    </div>
  );
}
