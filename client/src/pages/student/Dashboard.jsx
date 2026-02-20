import { motion } from "framer-motion";

export default function StudentDashboard({ setPage }) {
  const statCards = [
    { label: "Hostel", value: "Block A – Room 204", icon: "🏠", badge: null },
    { label: "Mess", value: "Veg – Active", icon: "🍽️", badge: null },
    {
      label: "Night Out",
      value: "Approved",
      icon: "🌙",
      badge: { text: "Approved", cls: "bg-green-100 text-green-700" },
    },
    {
      label: "Maintenance",
      value: "1 Active",
      icon: "🔧",
      badge: { text: "1 Active", cls: "bg-yellow-100 text-yellow-700" },
    },
  ];

  const activities = [
    "Night out approved",
    "Maintenance request submitted",
    "Mess assigned successfully",
    "Profile updated",
  ];

  const announcements = [
    "Hostel inspection on Monday",
    "Mess timing changed this Sunday",
    "WiFi maintenance at 8 PM",
  ];

  const quickActions = [
    {
      label: "Apply Night Out",
      cls: "bg-green-600 text-white hover:bg-green-700",
      action: "nightout",
    },
    {
      label: "Raise Maintenance",
      cls: "bg-white text-green-600 border border-green-600 hover:bg-green-50",
      action: "maintenance",
    },
    {
      label: "Download ID Card",
      cls: "bg-white text-green-600 border border-green-600 hover:bg-green-50",
      action: "id",
    },
  ];

  const emergencyContacts = [
    { label: "Ambulance", number: "+91 90000 00000" },
    { label: "Security", number: "+91 91111 11111" },
    { label: "Warden", number: "+91 92222 22222" },
  ];

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <div>
      {/* Dashboard Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome Back 👋
        </h1>
        <p className="text-gray-600">Dashboard</p>
      </div>

      {/* ── DASHBOARD CONTENT ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-5"
      >

            {/* Stat Cards — 2 cols on small, 4 cols on large */}
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
              {statCards.map((card) => (
                <motion.div
                  key={card.label}
                  variants={cardVariants}
                  whileHover={{ y: -3, boxShadow: "0 8px 24px rgba(0,0,0,0.10)" }}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 cursor-default"
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      {card.label}
                    </span>
                    <span className="text-xl opacity-60">{card.icon}</span>
                  </div>
                  <p className="text-base font-bold text-gray-800 mb-2">
                    {card.value}
                  </p>
                  {card.badge && (
                    <span
                      className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${card.badge.cls}`}
                    >
                      {card.badge.text}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Bottom Grid — stacks on small, side-by-side on large */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

              {/* Left Column — spans 2 of 3 cols on xl */}
              <div className="xl:col-span-2 flex flex-col gap-5">

                {/* Recent Activity */}
                <motion.div
                  variants={cardVariants}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
                >
                  <h3 className="font-bold text-gray-800 text-base mb-4">
                    Recent Activity
                  </h3>
                  <ul className="space-y-3">
                    {activities.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-3 text-sm text-gray-500"
                      >
                        <span className="text-emerald-500 font-bold text-base shrink-0">
                          ✓
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Announcements */}
                <motion.div
                  variants={cardVariants}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
                >
                  <h3 className="font-bold text-gray-800 text-base mb-4">
                    🔔 Announcements
                  </h3>
                  <ul className="space-y-3">
                    {announcements.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-gray-500"
                      >
                        <span className="text-emerald-500 font-bold mt-0.5 shrink-0">
                          •
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>

              </div>

              {/* Right Column */}
              <div className="flex flex-col gap-5">

                {/* Quick Actions */}
                <motion.div
                  variants={cardVariants}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
                >
                  <h3 className="font-bold text-gray-800 text-base mb-4">
                    Quick Actions
                  </h3>
                  <div className="flex flex-col gap-3">
                    {quickActions.map((action) => (
                      <motion.button
                        key={action.label}
                        onClick={() => setPage(action.action)}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        className={`w-full py-3 px-4 rounded-xl text-sm font-semibold transition-colors duration-200 ${action.cls}`}
                      >
                        {action.label}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* Emergency */}
                <motion.div
                  variants={cardVariants}
                  className="bg-green-50 border border-green-200 rounded-2xl p-6"
                >
                  <h3 className="font-bold text-green-700 text-base mb-4">
                    🚑 Emergency
                  </h3>
                  <div className="space-y-3">
                    {emergencyContacts.map((contact) => (
                      <p key={contact.label} className="text-sm text-gray-500">
                        <span className="font-semibold text-gray-700">
                          {contact.label}:
                        </span>{" "}
                        {contact.number}
                      </p>
                    ))}
                  </div>
                </motion.div>

              </div>
            </div>

      </motion.div>
    </div>
  );
}