export default function StudentDashboard({ setPage }) {
  return (
    <div className="min-h-screen bg-[#F3FAED] p-6">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-green-600">Student Dashboard</h1>
        <p className="text-gray-600">
          All your hostel information in one place
        </p>
      </header>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card
  title="Hostel Details"
  description="Room 204 · Block B"
  onClick={() => setPage("hostel")}
/>
        <Card
  title="Mess Details"
  description="Veg Mess · 3 Meals Daily"
  onClick={() => setPage("mess")}
/>

        <Card
          title="Digital ID Card"
          description="View & Download"
          onClick={() => setPage("id")}
        />

        {/* ✅ FIXED NIGHT OUT CARD */}
        <Card
          title="Night Out"
          description="Apply for permission"
          onClick={() => setPage("nightout")}
        />

        <Card
          title="Maintenance"
          description="Raise an issue"
          onClick={() => setPage("maintenance")}
        />
        <Card
          title="My Request Status"
          description="Track night out & maintenance"
          onClick={() => setPage("status")}
        />

        <Card
  title="Emergency"
  description="24×7 Ambulance & Support"
  highlight
  onClick={() => setPage("emergency")}
/>
      </div>
    </div>
  );
}

function Card({ title, description, highlight, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-2xl bg-white p-6 border transition-all
        hover:-translate-y-1 hover:shadow-xl
        ${
          highlight
            ? "border-green-400 shadow-green-200"
            : "border-green-100 hover:shadow-green-200"
        }
      `}
    >
      <h3 className="text-lg font-semibold text-green-600">{title}</h3>
      <p className="mt-2 text-gray-600">{description}</p>
    </div>
  );
}
