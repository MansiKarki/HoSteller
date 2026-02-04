import { useEffect, useState } from "react";
import API from "../../api";

export default function HostelDetails({ goBack }) {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    API.get("/auth/me").then(res => setStudent(res.data));
  }, []);

  if (!student) return null;

  return (
    <div className="min-h-screen bg-[#F3FAED] flex justify-center items-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">

        <button onClick={goBack} className="text-green-600 mb-4">
          ← Back
        </button>

        <h2 className="text-2xl font-bold text-green-600 mb-6">
          Hostel Details
        </h2>

        <Detail label="Hostel Name" value={student.hostel?.name} />
        <Detail label="Block" value={student.hostel?.block} />
        <Detail label="Room" value={student.hostel?.room} />
      </div>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div className="mb-4">
      <p className="text-gray-500">{label}</p>
      <p className="font-medium">{value || "Not Assigned"}</p>
    </div>
  );
}
