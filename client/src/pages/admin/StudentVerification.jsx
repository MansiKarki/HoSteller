import { useEffect, useState } from "react";
import API from "../../api";

export default function StudentVerification() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/admin/students")
      .then(res => setStudents(res.data))
      .finally(() => setLoading(false));
  }, []);

  async function toggleVerification(id) {
    const res = await API.put(`/admin/students/${id}/verify`);
    setStudents(prev =>
      prev.map(s => s._id === id ? { ...s, isVerified: res.data.isVerified } : s)
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Student Verification</h1>
        <p className="text-gray-500 mt-1">Verify or unverify registered student profiles</p>
      </div>

      {loading ? (
        <div className="bg-white rounded-2xl p-8 text-center text-gray-400 border border-gray-100 shadow-sm">
          Loading students...
        </div>
      ) : students.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
          <p className="text-gray-500 font-medium">No students found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {students.map(student => (
            <div
              key={student._id}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-green-600">
                    {student.name}
                    {student.rollNo && (
                      <span className="text-gray-400 font-normal text-sm ml-2">
                        ({student.rollNo})
                      </span>
                    )}
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">
                    {student.hostel?.name} &middot; Room {student.hostel?.room}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 text-xs rounded-full font-medium ${student.isVerified
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-500"
                    }`}
                >
                  {student.isVerified ? "Verified" : "Not Verified"}
                </span>
              </div>

              <div className="mt-5">
                <button
                  onClick={() => toggleVerification(student._id)}
                  className={`px-6 py-2.5 rounded-xl font-medium text-sm transition ${student.isVerified
                      ? "border border-red-400 text-red-500 hover:bg-red-50"
                      : "bg-green-600 text-white hover:bg-green-700"
                    }`}
                >
                  {student.isVerified ? "Unverify" : "Verify Student"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
