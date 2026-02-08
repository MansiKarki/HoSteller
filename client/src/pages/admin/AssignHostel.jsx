import { useEffect, useState } from "react";
import API from "../../api";

export default function AssignHostel({ goBack }) {
  const [students, setStudents] = useState([]);
  const [selected, setSelected] = useState(null);
  const [hostel, setHostel] = useState({
    name: "",
    block: "",
    room: "",
  });
  const [mess, setMess] = useState({
    type: "",
    timings: "",
  });

  useEffect(() => {
    API.get("/admin/students").then(res => setStudents(res.data));
  }, []);

  async function assign() {
  if (!selected) return alert("Select a student");

  await API.put(`/admin/students/${selected}/assign`, {
    hostel,
    mess,
  });

  alert("Hostel & Mess Assigned Successfully");
}


  return (
    <div className="min-h-screen bg-[#F3FAED] p-6">
      <button onClick={goBack} className="text-green-600 mb-4">
        ← Back
      </button>

      <h2 className="text-2xl font-bold text-green-600 mb-6">
        Assign Hostel & Mess
      </h2>

      <select
        onChange={e => setSelected(e.target.value)}
        className="w-full p-2 border rounded-xl mb-4"
      >
        <option>Select Student</option>
        {students.map(s => (
          <option key={s._id} value={s._id}>
            {s.name} ({s.rollNo})
          </option>
        ))}
      </select>

      {selected && (
        <>
          <input
            placeholder="Hostel Name"
            onChange={e =>
              setHostel({ ...hostel, name: e.target.value })
            }
            className="w-full p-2 border rounded-xl mb-2"
          />
          <input
            placeholder="Block"
            onChange={e =>
              setHostel({ ...hostel, block: e.target.value })
            }
            className="w-full p-2 border rounded-xl mb-2"
          />
          <input
            placeholder="Room Number"
            onChange={e =>
              setHostel({ ...hostel, room: e.target.value })
            }
            className="w-full p-2 border rounded-xl mb-2"
          />

          <input
            placeholder="Mess Type (Veg / Non-Veg)"
            onChange={e =>
              setMess({ ...mess, type: e.target.value })
            }
            className="w-full p-2 border rounded-xl mb-2"
          />
          <input
            placeholder="Mess Timings"
            onChange={e =>
              setMess({ ...mess, timings: e.target.value })
            }
            className="w-full p-2 border rounded-xl mb-4"
          />

          <button
            onClick={assign}
            className="w-full bg-green-600 text-white py-2 rounded-xl"
          >
            Assign
          </button>
        </>
      )}
    </div>
  );
}
