import { useEffect, useState } from "react";
import API from "../../api";

export default function AssignHostel() {
  const [students, setStudents] = useState([]);
  const [selected, setSelected] = useState(null);
  const [hostel, setHostel] = useState({ name: "", block: "", room: "" });
  const [mess, setMess] = useState({
    type: "",
    timings: "Morning: 11am to 2pm, Dinner: 7pm to 9pm"
  });
  const [success, setSuccess] = useState(false);

  const hostelNames = ["Vishalgad", "Purandar", "Janjira", "G1", "G2", "ABC", "Devgiri", "Other"];
  const blocks = ["A", "B", "C", "D"];

  useEffect(() => {
    API.get("/admin/students").then(res => setStudents(res.data));
  }, []);

  async function assign() {
    if (!selected) return alert("Please select a student first");
    if (!hostel.name || !hostel.block || !hostel.room || !mess.type) {
      return alert("Please fill all details");
    }
    await API.put(`/admin/students/${selected}/assign`, { hostel, mess });
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  }

  const inputCls =
    "w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition bg-white";

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Assign Hostel & Mess</h1>
        <p className="text-gray-500 mt-1">Allocate rooms and mess plans to students</p>
      </div>

      {success && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-5 py-3.5 rounded-2xl text-sm font-medium transition-all">
          Hostel & Mess assigned successfully.
        </div>
      )}

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 max-w-2xl">
        {/* Student Select */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-2">Select Student</label>
          <select
            onChange={e => setSelected(e.target.value)}
            className={inputCls}
            defaultValue=""
          >
            <option value="" disabled>Choose a student</option>
            {students.map(s => (
              <option key={s._id} value={s._id}>
                {s.name} ({s.rollNo})
              </option>
            ))}
          </select>
        </div>

        {selected && (
          <>
            {/* Hostel Section */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3">
                Hostel Details
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Hostel Name</label>
                  <select
                    value={hostel.name}
                    onChange={e => setHostel({ ...hostel, name: e.target.value })}
                    className={inputCls}
                  >
                    <option value="">Select Hostel</option>
                    {hostelNames.map(name => (
                      <option key={name} value={name}>{name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Block</label>
                  <select
                    value={hostel.block}
                    onChange={e => setHostel({ ...hostel, block: e.target.value })}
                    className={inputCls}
                  >
                    <option value="">Select Block</option>
                    {blocks.map(b => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Room Number</label>
                  <input
                    placeholder="e.g. 204"
                    value={hostel.room}
                    onChange={e => setHostel({ ...hostel, room: e.target.value })}
                    className={inputCls}
                  />
                </div>
              </div>
            </div>

            {/* Mess Section */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3">
                Mess Details
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Mess Type</label>
                  <select
                    value={mess.type}
                    onChange={e => setMess({ ...mess, type: e.target.value })}
                    className={inputCls}
                  >
                    <option value="">Select Mess Type</option>
                    <option value="Veg">Veg</option>
                    <option value="Non-Veg">Non-Veg</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Mess Timings</label>
                  <input
                    readOnly
                    value={mess.timings}
                    className={`${inputCls} bg-gray-50 text-gray-500 cursor-not-allowed`}
                  />
                </div>
              </div>
            </div>

            <button
              onClick={assign}
              className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition text-sm"
            >
              Assign Hostel & Mess
            </button>
          </>
        )}
      </div>
    </div>
  );
}
