import { useEffect, useRef, useState } from "react";
import API from "../../api";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function IDCard() {
  const [student, setStudent] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const cardRef = useRef();

  useEffect(() => {
    API.get("/auth/me").then(res => setStudent(res.data));
  }, []);

  async function downloadID() {
    if (!cardRef.current) return;
    
    try {
      setDownloading(true);
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: "#ffffff",
        scale: 2,
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("landscape", "mm", "a4");
      pdf.addImage(imgData, "PNG", 10, 10, 270, 155);
      pdf.save("HoSteller_Digital_ID_Card.pdf");
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setDownloading(false);
    }
  }

  if (!student) return (
    <div className="flex items-center justify-center py-20">
      <p className="text-gray-500">Loading...</p>
    </div>
  );

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Digital ID Card 🎫</h1>
        <p className="text-gray-500 text-sm mt-0.5">Your official hostel identity card</p>
      </div>

      {/* Two Column Layout */}
      <div className="flex gap-6 items-start">

        {/* LEFT — ID Card 70% */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8" style={{ flex: "0 0 68%" }}>

          {!student.isVerified ? (
            <div className="py-16 flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center text-4xl mb-4">🔒</div>
              <h2 className="text-xl font-bold text-red-600">Profile Not Verified</h2>
              <p className="text-gray-500 text-sm mt-2">Your profile needs admin verification to download the ID card. Contact your warden once verification is complete.</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-6">
              {/* ID CARD DESIGN */}
              <div
                ref={cardRef}
                className="w-full max-w-md aspect-video bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-6 text-white shadow-lg flex flex-col justify-between relative overflow-hidden"
              >
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500 rounded-full -mr-10 -mt-10 opacity-20"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-400 rounded-full -ml-8 -mb-8 opacity-20"></div>

                {/* Top Section */}
                <div className="relative z-10">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-sm font-bold tracking-widest opacity-75">HOSTELLER</h2>
                      <h1 className="text-2xl font-bold mt-1">Digital ID Card</h1>
                    </div>
                    <div className="text-4xl">🎫</div>
                  </div>
                </div>

                {/* Middle Section - Student Info */}
                <div className="relative z-10 bg-emerald-800 bg-opacity-50 p-4 rounded-xl">
                  <p className="text-xs opacity-75 uppercase tracking-wide">Student Name</p>
                  <p className="text-lg font-bold">{student.name}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mt-3 text-xs">
                    <div>
                      <p className="opacity-75">Roll ID</p>
                      <p className="font-semibold">{student.rollNumber || "N/A"}</p>
                    </div>
                    <div>
                      <p className="opacity-75">Email</p>
                      <p className="font-semibold text-[11px] truncate">{student.email}</p>
                    </div>
                  </div>
                </div>

                {/* Bottom Section */}
                <div className="relative z-10 text-xs opacity-90 flex justify-between items-end">
                  <div>
                    <p className="opacity-75">Hostel</p>
                    <p className="font-semibold">{student.hostel?.name || "Not Assigned"}</p>
                  </div>
                  <div className="text-right">
                    <p className="opacity-75">Valid Until</p>
                    <p className="font-semibold">2025-2026</p>
                  </div>
                </div>
              </div>

              {/* Download Button */}
              <button
                onClick={downloadID}
                disabled={downloading}
                className="w-full py-3.5 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-bold text-base rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
              >
                {downloading ? "Downloading..." : "⬇️ Download as PDF"}
              </button>

              {/* Info */}
              <p className="text-sm text-gray-500 text-center">
                Keep this ID card safe. It's valid for the current academic year. In case of loss, contact your warden immediately.
              </p>
            </div>
          )}

        </div>

        {/* RIGHT — Info Panel 30% */}
        <div className="flex flex-col gap-4" style={{ flex: "0 0 30%" }}>

          {/* Card Details */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-bold text-gray-800 text-sm mb-3 flex items-center gap-2">
              <span>👤</span> Card Details
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400 font-medium">Status</span>
                <span className={`font-bold px-2.5 py-1 rounded-full ${student.isVerified ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                  {student.isVerified ? "Verified ✓" : "Not Verified"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 font-medium">Valid Till</span>
                <span className="text-gray-700 font-semibold">2025-2026</span>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-5">
            <h3 className="font-bold text-emerald-800 text-sm mb-3 flex items-center gap-2">
              <span>📋</span> Instructions
            </h3>
            <ul className="space-y-2 text-xs text-emerald-700">
              <li className="flex gap-2">
                <span>•</span>
                <span>Download and keep a safe copy</span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span>Carry printed version when needed</span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span>Valid for current academic year only</span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span>Report loss to warden immediately</span>
              </li>
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
}
