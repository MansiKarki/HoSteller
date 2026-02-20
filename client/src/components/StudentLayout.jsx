import { motion } from "framer-motion";

export default function StudentLayout({ page, setPage, children, onLogout }) {
  const menuItems = [
    { id: "dashboard", title: "Dashboard", description: "Home" },
    { id: "nightout", title: "Night Out", description: "Apply for permission" },
    { id: "hostel", title: "Hostel Details", description: "Room & facilities" },
    { id: "mess", title: "Mess Details", description: "Menu & timings" },
    { id: "maintenance", title: "Maintenance", description: "Raise issues" },
    { id: "status", title: "Request Status", description: "Track approvals" },
    { id: "id", title: "Digital ID Card", description: "View & download" },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* ── SIDEBAR (fixed position) ── */}
      <motion.aside
        initial={{ width: 280 }}
        animate={{ width: 280 }}
        className="fixed top-0 left-0 h-full bg-white border-r-2 border-green-600 text-gray-800 flex flex-col z-20 overflow-hidden shadow-md"
      >
            {/* Sidebar inner — fixed width so content doesn't wrap during animation */}
            <div className="w-70 flex flex-col h-full">
              <div className="p-6 shrink-0 border-b border-gray-200">
                <h2 className="text-xl font-bold text-green-600">Student Portal</h2>
                <p className="text-sm text-gray-500">Campus Hub</p>
              </div>

              <nav className="flex-1 px-4 space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setPage(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      page === item.id
                        ? "bg-green-50 text-green-700 border-l-4 border-green-600"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <p className="font-medium text-sm">{item.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{item.description}</p>
                  </button>
                ))}
              </nav>

              <div className="p-4 shrink-0 border-t border-gray-200">
                <button onClick={onLogout} className="w-full px-4 py-2 text-sm rounded-lg bg-green-600 text-white hover:bg-green-700 transition font-semibold">
                  Logout
                </button>
              </div>
            </div>
          </motion.aside>

      {/* ── MAIN CONTENT (offset by sidebar width via margin) ── */}
      <motion.div
        animate={{ marginLeft: 280 }}
        transition={{ type: "spring", stiffness: 300, damping: 35 }}
        className="flex-1 min-w-0"
      >
        <div>
          {/* Page Content */}
          <div className="px-8 py-8 pb-8">
            {children}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
