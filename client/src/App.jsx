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
import StudentLayout from "./components/StudentLayout";
import MyStatus from "./pages/student/MyStatus";
import MyRequests from "./pages/student/MyRequests";
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
    const renderStudentContent = () => {
      const commonProps = { setPage };
      
      switch (page) {
        case "nightout":
          return <NightOut {...commonProps} />;
        case "hostel":
          return <HostelDetails />;
        case "mess":
          return <MessDetails />;
        case "maintenance":
          return <Maintenance />;
        case "emergency":
          return <Emergency />;
        case "id":
          return <IDCard />;
        case "status":
          return <MyStatus />;
        default:
          return <StudentDashboard {...commonProps} />;
      }
    };

    return (
      <StudentLayout page={page} setPage={setPage} onLogout={handleLogout}>
        {renderStudentContent()}
      </StudentLayout>
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
