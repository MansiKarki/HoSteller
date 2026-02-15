import { useEffect, useRef, useState } from "react";
import API from "../../api";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function IDCard({ goBack }) {
  const [student, setStudent] = useState(null);
  const cardRef = useRef();

  useEffect(() => {
    API.get("/auth/me").then(res => setStudent(res.data));
  }, []);

  async function downloadID() {
    const canvas = await html2canvas(cardRef.current);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("portrait", "mm", "a4");
    pdf.addImage(imgData, "PNG", 30, 30, 150, 90);
    pdf.save("Hosteller_ID_Card.pdf");
  }

  if (!student) return null;

  return (
    <div className="min-h-screen bg-[#F3FAED] flex items-center justify-center px-6">
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
              Your profile is not verified by admin yet.
            </p>
          </>
        ) : (
          <>
            {/* ID CARD DESIGN */}
            <div
              ref={cardRef}
              className="border-2 border-green-600 rounded-xl p-6 text-center"
            >
              <h2 className="text-xl font-bold text-green-600 mb-2">
                HOSTELLER
              </h2>

              <p className="text-sm text-gray-500 mb-4">
                Student Digital ID Card
              </p>

              <div className="space-y-1 text-gray-700">
                <p><b>Name:</b> {student.name}</p>
                <p><b>Roll No:</b> {student.rollNo}</p>
                <p><b>Hostel:</b> {student.hostel?.name}</p>
                <p><b>Room:</b> {student.hostel?.room}</p>
                <p><b>Mess:</b> {student.mess?.type}</p>
              </div>
            </div>

            {/* DOWNLOAD BUTTON */}
            <button
              onClick={downloadID}
              className="w-full mt-6 bg-green-600 text-white py-2 rounded-xl hover:bg-green-700"
            >
              Download ID Card
            </button>
          </>
        )}
      </div>
    </div>
  );
}
