import { useEffect, useState } from "react";
import API from "../../api";

export default function IDCard({ goBack }) {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    API.get("/auth/me").then(res => setStudent(res.data));
  }, []);

  if (!student) return null;

  return (
    <div className="min-h-screen bg-[#F3FAED] flex justify-center items-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm">

        <button onClick={goBack} className="text-green-600 mb-4">
          ← Back
        </button>

        {!student.isVerified ? (
          <>
            <h2 className="text-xl font-bold text-red-500">
              ID Card Locked
            </h2>
            <p className="text-gray-600 mt-2">
              Waiting for admin verification
            </p>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold text-green-600">
              Digital ID Card
            </h2>

            <div className="mt-4 space-y-2">
              <p><b>Name:</b> {student.name}</p>
              <p><b>Roll No:</b> {student.rollNo}</p>
              <p><b>Hostel:</b> {student.hostel?.name}</p>
              <p><b>Room:</b> {student.hostel?.room}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
