import { useState } from "react";
import LandingPage from "./pages/LandingPage";
import StudentDashboard from "./pages/student/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import NightOut from "./pages/student/NightOut";
import Maintenance from "./pages/student/Maintenance";
import IDCard from "./pages/student/IDCard";
import NightOutApprovals from "./pages/admin/NightOutApprovals";
import MaintenanceRequests from "./pages/admin/MaintenanceRequests";
import StudentVerification from "./pages/admin/StudentVerification";
import StudentLayout from "./components/StudentLayout";
import AdminLayout from "./components/AdminLayout";
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

  // ── STUDENT ──
  if (role === "student") {
    const renderStudentContent = () => {
      switch (page) {
        case "nightout": return <NightOut setPage={setPage} />;
        case "hostel": return <HostelDetails />;
        case "mess": return <MessDetails />;
        case "maintenance": return <Maintenance />;
        case "emergency": return <Emergency />;
        case "id": return <IDCard />;
        case "status": return <MyStatus />;
        default: return <StudentDashboard setPage={setPage} />;
      }
    };

    return (
      <StudentLayout page={page} setPage={setPage} onLogout={handleLogout}>
        {renderStudentContent()}
      </StudentLayout>
    );
  }

  // ── ADMIN ──
  if (role === "admin") {
    const renderAdminContent = () => {
      switch (page) {
        case "nightout": return <NightOutApprovals />;
        case "maintenance": return <MaintenanceRequests />;
        case "verify": return <StudentVerification />;
        case "assign": return <AssignHostel />;
        default: return <AdminDashboard setPage={setPage} />;
      }
    };

    return (
      <AdminLayout page={page} setPage={setPage} onLogout={handleLogout}>
        {renderAdminContent()}
      </AdminLayout>
    );
  }
}
