import { useEffect, useState } from "react";
import API from "../../api";

export default function StudentVerification({ goBack }) {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    API.get("/admin/students").then(res => {
      setStudents(res.data);
    });
  }, []);

  async function toggleVerification(id) {
    const res = await API.put(`/admin/students/${id}/verify`);
    setStudents(prev =>
      prev.map(s =>
        s._id === id ? { ...s, isVerified: res.data.isVerified } : s
      )
    );
  }

  return (
    <div className="min-h-screen bg-[#F3FAED] p-6">
      <button onClick={goBack} className="text-green-600 mb-4">
        ← Back to Dashboard
      </button>

      <h2 className="text-2xl font-bold text-green-600 mb-6">
        Student Verification
      </h2>

      <div className="space-y-4">
        {students.map(student => (
          <div
            key={student._id}
            className="bg-white p-5 rounded-2xl border border-green-100 shadow"
          >
            <h3 className="font-semibold text-green-600">
              {student.name} ({student.rollNo})
            </h3>

            <p className="text-gray-600 text-sm">
              Hostel: {student.hostel?.name} · Room {student.hostel?.room}
            </p>

            <p className="mt-2 font-medium">
              Status:
              <span
                className={`ml-2 ${
                  student.isVerified
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {student.isVerified ? "Verified" : "Not Verified"}
              </span>
            </p>

            <button
              onClick={() => toggleVerification(student._id)}
              className={`mt-4 px-4 py-2 rounded-lg ${
                student.isVerified
                  ? "border border-red-400 text-red-500"
                  : "bg-green-600 text-white"
              }`}
            >
              {student.isVerified ? "Unverify" : "Verify"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
