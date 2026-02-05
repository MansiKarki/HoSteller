export default function AdminDashboard({ setPage }) {
  return (
    <div className="min-h-screen bg-[#F3FAED] p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-green-600">
          Admin Dashboard
        </h1>
        <p className="text-gray-600">
          Manage hostel operations & student activities
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card
          title="Night Out Approvals"
          description="Approve or reject requests"
          onClick={() => setPage("nightout")}
        />
        <Card
          title="Maintenance Requests"
          description="View & resolve issues"
          onClick={() => setPage("maintenance")}
        />
        <Card
          title="Student Verification"
          description="Verify student profiles"
          onClick={() => setPage("verify")}
        />
        <Card
  title="Assign Hostel & Mess"
  description="Allocate rooms & mess"
  onClick={() => setPage("assign")}
/>

      </div>
    </div>
  );
}

function Card({ title, description, onClick }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-white p-6 rounded-2xl border border-green-100
        transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-green-200"
    >
      <h3 className="text-lg font-semibold text-green-600">{title}</h3>
      <p className="text-gray-600 mt-2">{description}</p>
    </div>
  );
}
