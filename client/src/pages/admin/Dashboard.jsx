export default function AdminDashboard({ setPage }) {
  const statCards = [
    { label: "Night Out", value: "Pending", sub: "Requests awaiting", color: "yellow" },
    { label: "Maintenance", value: "Open", sub: "Issues raised", color: "blue" },
    { label: "Verification", value: "Students", sub: "Need verification", color: "green" },
    { label: "Assignments", value: "Hostel", sub: "Mess allocation", color: "purple" },
  ];

  const colorMap = {
    yellow: "bg-yellow-50 border-yellow-200 text-yellow-700",
    blue: "bg-blue-50 border-blue-200 text-blue-700",
    green: "bg-green-50 border-green-200 text-green-700",
    purple: "bg-purple-50 border-purple-200 text-purple-700",
  };

  const quickActions = [
    { label: "Approve Night Outs", page: "nightout", primary: true },
    { label: "View Maintenance Issues", page: "maintenance", primary: false },
    { label: "Verify Students", page: "verify", primary: false },
    { label: "Assign Hostel & Mess", page: "assign", primary: false },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
        <p className="text-gray-500 mt-1">Admin Dashboard</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((card) => (
          <div
            key={card.label}
            className={`border rounded-2xl p-5 ${colorMap[card.color]}`}
          >
            <p className="text-xs font-semibold uppercase tracking-wide opacity-60 mb-3">
              {card.label}
            </p>
            <p className="text-xl font-bold">{card.value}</p>
            <p className="text-xs opacity-50 mt-0.5">{card.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <h2 className="text-base font-semibold text-gray-700 mb-5">Quick Actions</h2>
          <div className="space-y-3">
            {quickActions.map((action) => (
              <button
                key={action.page}
                onClick={() => setPage(action.page)}
                className={`w-full py-3 rounded-xl font-medium text-sm transition-all ${action.primary
                    ? "bg-green-600 text-white hover:bg-green-700 shadow-sm"
                    : "border border-green-600 text-green-600 hover:bg-green-50"
                  }`}
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>

        {/* Admin Notes */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <h2 className="text-base font-semibold text-gray-700 mb-5">Checklist</h2>
          <ul className="space-y-3 text-sm text-gray-500">
            {[
              "Review pending night out requests",
              "Check new maintenance issues",
              "Verify newly registered students",
              "Assign hostels to new students",
            ].map((tip, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-green-400 shrink-0 inline-block"></span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
