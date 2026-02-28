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
    if (!cardRef.current || !student) return;

    try {
      setDownloading(true);

      // Capture the ID card as canvas
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 3, // Higher scale for better quality
        useCORS: true,
        logging: false,
        letterRendering: true,
        onclone: (clonedDoc) => {
          const card = clonedDoc.querySelector(".id-card-capture");
          if (card) {
            card.style.height = "280px";
            card.style.padding = "24px";
            card.style.display = "flex";
            card.style.flexDirection = "column";
            card.style.justifyContent = "space-between";
          }
        }
      });

      // Get image data
      const imgData = canvas.toDataURL("image/png");

      // Create PDF matching the canvas size (treating pixels as points)
      // We divide by scale to keep the PDF size reasonable while maintaining high DPI
      const pdfWidth = canvas.width / 3;
      const pdfHeight = canvas.height / 3;

      const pdf = new jsPDF({
        orientation: pdfWidth > pdfHeight ? "landscape" : "portrait",
        unit: "pt",
        format: [pdfWidth, pdfHeight],
      });

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`HoSteller_ID_${student.name.replace(/\s+/g, '_')}.pdf`);
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
        <h1 className="text-2xl font-bold text-gray-800">Digital ID Card</h1>
        <p className="text-gray-500 text-sm mt-0.5">Your official hostel identity card</p>
      </div>

      {/* Two Column Layout */}
      <div className="flex gap-6 items-start">

        {/* LEFT — ID Card 70% */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8" style={{ flex: "0 0 68%" }}>

          {!student.isVerified ? (
            <div className="py-16 flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </div>
              <h2 className="text-xl font-bold text-red-600">Profile Not Verified</h2>
              <p className="text-gray-500 text-sm mt-2">Your profile needs admin verification to download the ID card. Contact your warden once verification is complete.</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-6">
              {/* ID CARD DESIGN */}
              <div
                ref={cardRef}
                className="id-card-capture w-full max-w-md h-[270px] rounded-2xl p-6 text-white shadow-lg flex flex-col justify-between relative overflow-hidden"
                style={{ background: "linear-gradient(to bottom right, #16a34a, #15803d)" }}
              >
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full -mr-10 -mt-10 opacity-20" style={{ backgroundColor: "#10b981" }}></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full -ml-8 -mb-8 opacity-20" style={{ backgroundColor: "#34d399" }}></div>

                {/* Top Section */}
                <div className="relative z-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-sm font-bold tracking-widest opacity-75">HOSTELLER</h2>
                      <h1 className="text-2xl font-bold mt-1">Digital ID Card</h1>
                    </div>
                  </div>
                </div>

                {/* Middle Section - Student Info */}
                <div className="relative z-0 p-5 rounded-xl my-2" style={{ backgroundColor: "rgba(6, 78, 59, 0.85)" }}>
                  <p className="text-[10px] opacity-75 uppercase tracking-wide mb-1 leading-none">Student Name</p>
                  <p className="text-lg font-bold leading-tight">{student.name}</p>

                  <div className="flex gap-4 mt-4 text-xs">
                    <div className="flex-1">
                      <p className="opacity-75 text-[10px] uppercase mb-1 leading-none">Roll ID</p>
                      <p className="font-semibold leading-tight">{student.rollNo || "N/A"}</p>
                    </div>
                    <div className="flex-[1.5]">
                      <p className="opacity-75 text-[10px] uppercase mb-1 leading-none">Email</p>
                      <p className="font-semibold text-[11px] break-all leading-tight">{student.email}</p>
                    </div>
                  </div>
                </div>

                {/* Bottom Section */}
                <div className="relative z-0 text-xs opacity-90 flex justify-between items-end mt-1">
                  <div>
                    <p className="opacity-75 text-[10px] uppercase mb-0.5">Hostel</p>
                    <p className="font-semibold">{student.hostel?.name || "Not Assigned"}</p>
                  </div>
                  <div className="text-right">
                    <p className="opacity-75 text-[10px] uppercase mb-0.5">Valid Until</p>
                    <p className="font-semibold">2025-2026</p>
                  </div>
                </div>
              </div>

              {/* Download Button */}
              <button
                onClick={downloadID}
                disabled={downloading}
                className="w-full py-3.5 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-bold text-base rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
              >
                {downloading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    <span>Generating PDF...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    <span>Download Official ID Card</span>
                  </>
                )}
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
            <h3 className="font-bold text-gray-800 text-sm mb-3">Card Details</h3>
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
            <h3 className="font-bold text-emerald-800 text-sm mb-3">Instructions</h3>
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
