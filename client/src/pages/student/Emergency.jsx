import { PhoneCall } from "lucide-react";

export default function Emergency({ goBack }) {
  return (
    <div className="min-h-screen bg-[#F3FAED] flex items-center justify-center px-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">

        <button onClick={goBack} className="text-green-600 mb-4">
          ← Back to Dashboard
        </button>

        <h2 className="text-2xl font-bold text-green-600 mb-2">
          Emergency Support
        </h2>

        <p className="text-gray-600 mb-6">
          Available 24×7 for medical and hostel emergencies
        </p>

        {/* Ambulance */}
        <EmergencyCard
          title="Ambulance"
          number="+91 108"
          description="Government Emergency Ambulance"
        />

        {/* Warden */}
        <EmergencyCard
          title="Hostel Warden"
          number="+91 9876543210"
          description="On-duty Hostel Warden"
        />

        {/* Security */}
        <EmergencyCard
          title="Hostel Security"
          number="+91 9123456789"
          description="Campus Security Desk"
        />
      </div>
    </div>
  );
}

function EmergencyCard({ title, number, description }) {
  return (
    <div className="border border-green-200 rounded-xl p-4 mb-4">
      <h3 className="font-semibold text-green-600">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>

      <a
        href={`tel:${number}`}
        className="mt-3 inline-flex items-center gap-2 text-green-600 font-medium"
      >
        <PhoneCall size={18} />
        Call {number}
      </a>
    </div>
  );
}
