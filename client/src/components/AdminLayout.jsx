import { motion } from "framer-motion";

export default function AdminLayout({ page, setPage, children, onLogout }) {
    const menuItems = [
        { id: "dashboard", title: "Dashboard", description: "Overview & stats" },
        { id: "nightout", title: "Night Out Approvals", description: "Approve / reject" },
        { id: "maintenance", title: "Maintenance", description: "View & resolve issues" },
        { id: "verify", title: "Student Verification", description: "Verify profiles" },
        { id: "assign", title: "Assign Hostel & Mess", description: "Allocate rooms & mess" },
    ];

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            {/* ── SIDEBAR ── */}
            <motion.aside
                initial={{ width: 280 }}
                animate={{ width: 280 }}
                className="fixed top-0 left-0 h-full bg-white border-r-2 border-green-600 text-gray-800 flex flex-col z-20 overflow-hidden shadow-md"
            >
                <div className="w-70 flex flex-col h-full">
                    {/* Logo */}
                    <div className="p-6 shrink-0 border-b border-gray-200">
                        <h2 className="text-xl font-bold text-green-600">Admin Portal</h2>
                        <p className="text-sm text-gray-500">Hostel Management</p>
                    </div>

                    {/* Nav items */}
                    <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setPage(item.id)}
                                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${page === item.id
                                    ? "bg-green-50 text-green-700 border-l-4 border-green-600"
                                    : "text-gray-700 hover:bg-gray-100"
                                    }`}
                            >
                                <p className="font-medium text-sm">{item.title}</p>
                                <p className="text-xs text-gray-400 mt-0.5">{item.description}</p>
                            </button>
                        ))}
                    </nav>

                    {/* Logout */}
                    <div className="p-4 shrink-0 border-t border-gray-200">
                        <button
                            onClick={onLogout}
                            className="w-full px-4 py-2 text-sm rounded-lg bg-green-600 text-white hover:bg-green-700 transition font-semibold"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </motion.aside>

            {/* ── MAIN CONTENT ── */}
            <motion.div
                animate={{ marginLeft: 280 }}
                transition={{ type: "spring", stiffness: 300, damping: 35 }}
                className="flex-1 min-w-0 overflow-y-auto"
            >
                <div className="px-8 py-8 pb-8 min-h-screen bg-gray-50">
                    {children}
                </div>
            </motion.div>
        </div>
    );
}
