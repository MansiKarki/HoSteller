import { useEffect, useState } from "react";
import API from "../../api";

export default function MyRequests() {
  const [nightOuts, setNightOuts] = useState([]);

  useEffect(() => {
    API.get("/student/nightout").then(res => setNightOuts(res.data));
  }, []);

  return (
    <div>
      <h2>My Night Out Requests</h2>
      {nightOuts.map(n => (
        <p key={n._id}>
          {n.date} – {n.status}
        </p>
      ))}
    </div>
  );
}
