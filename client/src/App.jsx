import { useState } from "react";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import StudentDashboard from "./pages/student/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import NightOut from "./pages/student/NightOut";
import Maintenance from "./pages/student/Maintenance";
import IDCard from "./pages/student/IDCard";
import NightOutApprovals from "./pages/admin/NightOutApprovals";
import MaintenanceRequests from "./pages/admin/MaintenanceRequests";
import StudentVerification from "./pages/admin/StudentVerification";
import StudentNavbar from "./components/StudentNavbar";
import AdminNavbar from "./components/AdminNavbar";
import MyStatus from "./pages/student/MyStatus";
import HostelDetails from "./pages/student/HostelDetails";
import MessDetails from "./pages/student/MessDetails";
import Emergency from "./pages/student/Emergency";
import AssignHostel from "./pages/admin/AssignHostel";


export default function App() {
  const [role, setRole] = useState(null);
  const [page, setPage] = useState("dashboard");

  const handleLogout = () => {
    localStorage.removeItem('token');
    setRole(null);
    setPage("dashboard");
  };

  // Show landing page when not logged in
  if (!role) {
    return <LandingPage onLogin={setRole} />;
  }

  if (role === "student") {
    if (page === "nightout") {
      return (
        <>
          <StudentNavbar setPage={setPage} onLogout={handleLogout} />
          <NightOut goBack={() => setPage("dashboard")} />
        </>
      );
    }
    if (page === "hostel") {
    return <HostelDetails goBack={() => setPage("dashboard")} />;
  }
   if (page === "mess") {
    return <MessDetails goBack={() => setPage("dashboard")} />;
  }

    if (page === "maintenance") {
      return (
        <>
          <StudentNavbar setPage={setPage} onLogout={handleLogout} />
          <Maintenance goBack={() => setPage("dashboard")} />
        </>
      );
    }
    if (page === "emergency") {
  return <Emergency goBack={() => setPage("dashboard")} />;
}

    if (page === "id") {
      return (
        <>
          <StudentNavbar setPage={setPage} onLogout={handleLogout} />
          <IDCard goBack={() => setPage("dashboard")} />
        </>
      );
    }
    if (page === "status") {
    return <MyStatus goBack={() => setPage("dashboard")} />;
  }

    return (
      <>
        <StudentNavbar setPage={setPage} onLogout={handleLogout} />
        <StudentDashboard setPage={setPage} />
      </>
    );
  }


  if (role === "admin") {
    if (page === "nightout") {
      return (
        <>
          <AdminNavbar setPage={setPage} onLogout={handleLogout} />
          <NightOutApprovals goBack={() => setPage("dashboard")} />
        </>
      );
    }
    if (page === "assign") {
  return <AssignHostel goBack={() => setPage("dashboard")} />;
}

    if (page === "maintenance") {
      return (
        <>
          <AdminNavbar setPage={setPage} onLogout={handleLogout} />
          <MaintenanceRequests goBack={() => setPage("dashboard")} />
        </>
      );
    }

    if (page === "verify") {
      return (
        <>
          <AdminNavbar setPage={setPage} onLogout={handleLogout} />
          <StudentVerification goBack={() => setPage("dashboard")} />
        </>
      );
    }

    return (
      <>
        <AdminNavbar setPage={setPage} onLogout={handleLogout} />
        <AdminDashboard setPage={setPage} />
      </>
    );
  }
   
}
