import { AlertCircle, Phone, MapPin, Clock } from "lucide-react";

const emergencyContacts = [
  {
    category: "Medical",
    icon: "🚑",
    contacts: [
      { title: "Ambulance", number: "+91 108", desc: "Government Emergency" },
      { title: "Hospital", number: "+91 9876543200", desc: "Nearby Medical Center" },
    ],
  },
  {
    category: "Hostel Security",
    icon: "🛡️",
    contacts: [
      { title: "Security Desk", number: "+91 9876543210", desc: "Campus Security 24/7" },
      { title: "Gate Security", number: "+91 9876543211", desc: "Main Gate - Always Available" },
    ],
  },
  {
    category: "Hostel Management",
    icon: "🏢",
    contacts: [
      { title: "Chief Warden", number: "+91 9876543212", desc: "Hostel Chief Warden" },
      { title: "Assistant Warden", number: "+91 9876543213", desc: "Assistant Warden On Duty" },
    ],
  },
  {
    category: "External Services",
    icon: "⚠️",
    contacts: [
      { title: "Police", number: "100", desc: "National Police Helpline" },
      { title: "Fire", number: "101", desc: "National Fire Service" },
    ],
  },
];

export default function Emergency() {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const callNumber = (number) => {
    const link = document.createElement('a');
    link.href = `tel:${number}`;
    link.click();
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <AlertCircle className="w-6 h-6 text-red-500" />
          Emergency Support 🚨
        </h1>
        <p className="text-gray-500 text-sm mt-0.5">24×7 Emergency contacts available</p>
      </div>

      {/* Alert Banner */}
      <div className="bg-green-50 border border-green-300 rounded-2xl p-5">
        <div className="flex gap-3 items-start">
          <div className="text-2xl mt-1">⚠️</div>
          <div>
            <p className="font-bold text-green-900">In case of life-threatening emergency</p>
            <p className="text-green-800 text-sm mt-1">Call <b>108 (Ambulance)</b> or <b>100 (Police)</b> immediately. Do not delay.</p>
          </div>
        </div>
      </div>

      {/* Emergency Contacts Grid */}
      <div className="space-y-6">
        {emergencyContacts.map((section, idx) => (
          <div key={idx}>
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-2xl">{section.icon}</span>
              {section.category}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {section.contacts.map((contact, contactIdx) => (
                <div
                  key={contactIdx}
                  className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 hover:shadow-md transition"
                >
                  <h3 className="font-bold text-gray-800 text-base mb-1">
                    {contact.title}
                  </h3>
                  <p className="text-xs text-gray-500 mb-4">{contact.desc}</p>

                  <div className="flex gap-2">
                    <button
                      onClick={() => callNumber(contact.number)}
                      className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold text-sm rounded-lg transition flex items-center justify-center gap-2"
                    >
                      <Phone className="w-4 h-4" />
                      Call Now
                    </button>
                    <button
                      onClick={() => copyToClipboard(contact.number)}
                      className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-sm rounded-lg transition"
                      title="Copy to clipboard"
                    >
                      {contact.number}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Important Information Box */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Location Info */}
        <div className="bg-blue-50 rounded-2xl border border-blue-200 p-6">
          <h3 className="font-bold text-blue-800 mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Important Locations
          </h3>
          <div className="space-y-3 text-sm text-blue-800">
            <div>
              <p className="font-semibold">Warden Office</p>
              <p className="text-xs text-blue-700 mt-1">Block A, Ground Floor (beside main gate)</p>
            </div>
            <div>
              <p className="font-semibold">Health Center</p>
              <p className="text-xs text-blue-700 mt-1">Medical Block, Near Sports Field</p>
            </div>
            <div>
              <p className="font-semibold">Security Desk</p>
              <p className="text-xs text-blue-700 mt-1">Main Gate, 24/7 Available</p>
            </div>
          </div>
        </div>

        {/* Response Time Info */}
        <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-6">
          <h3 className="font-bold text-emerald-800 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Expected Response Time
          </h3>
          <div className="space-y-3 text-sm text-emerald-800">
            <div>
              <p className="font-semibold">Medical Emergency</p>
              <p className="text-xs text-emerald-700 mt-1">Ambulance within 5-10 minutes</p>
            </div>
            <div>
              <p className="font-semibold">Security Issues</p>
              <p className="text-xs text-emerald-700 mt-1">Response within 2-3 minutes</p>
            </div>
            <div>
              <p className="font-semibold">Hostel Issues</p>
              <p className="text-xs text-emerald-700 mt-1">Warden response within 10-15 min</p>
            </div>
          </div>
        </div>

      </div>

      {/* Tips Section */}
      <div className="bg-amber-50 rounded-2xl border border-amber-200 p-6">
        <h3 className="font-bold text-amber-800 mb-4 flex items-center gap-2">
          <span>📌</span> Important Tips
        </h3>
        <ul className="space-y-2 text-sm text-amber-800">
          <li className="flex gap-3">
            <span className="font-bold">1.</span>
            <span>Always stay calm and provide clear information to the operator</span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold">2.</span>
            <span>Clearly mention your location (Hostel Block, Room Number)</span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold">3.</span>
            <span>For medical emergencies, describe symptoms clearly</span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold">4.</span>
            <span>Keep emergency numbers saved in your phone</span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold">5.</span>
            <span>Inform your roommates and warden of any serious situation</span>
          </li>
        </ul>
      </div>

    </div>
  );
}
