import { useState } from "react";
import AppointmentsList from "../component/AppointmentsList";
import BlockedSlotsList from "../component/BlockedSlotsList";
import DoctorsList from "../component/DoctorsList";
import { useNavigate } from "react-router-dom";

type Section = "appointments" | "blockedSlots" | "doctors";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState<Section>("appointments");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
  localStorage.removeItem("adminToken");
  navigate("/admin/login");
};
  return (
  <div className="flex min-h-screen relative">
    {/* زر فتح القائمة - يظهر بس على الموبايل */}
    <button
      onClick={() => setIsSidebarOpen(true)}
      className="md:hidden fixed top-4 left-4 z-50 bg-gray-900 text-white p-2 rounded"
    >
      ☰
    </button>

    {/* خلفية شفافة تقفل القائمة لما تضغط برّاها (موبايل بس) */}
    {isSidebarOpen && (
      <div
        onClick={() => setIsSidebarOpen(false)}
        className="md:hidden fixed inset-0 bg-black/50 z-40"
      />
    )}

    {/* الشريط الجانبي */}
    <aside
  className={`
    w-64 bg-gray-900 text-white p-4 flex flex-col
    fixed md:static top-0 left-0 h-full md:h-auto z-40
    transition-transform duration-300
    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0
  `}
>
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

      <nav className="flex flex-col gap-2">
        <button
          onClick={() => {
            setActiveSection("appointments");
            setIsSidebarOpen(false);
          }}
          className={`text-left px-3 py-2 rounded ${
            activeSection === "appointments" ? "bg-blue-600" : "hover:bg-gray-800"
          }`}
        >
          Appointments
        </button>

        <button
          onClick={() => {
            setActiveSection("doctors");
            setIsSidebarOpen(false);
          }}
          className={`text-left px-3 py-2 rounded ${
            activeSection === "doctors" ? "bg-blue-600" : "hover:bg-gray-800"
          }`}
        >
          Doctors
        </button>

        <button
          onClick={() => {
            setActiveSection("blockedSlots");
            setIsSidebarOpen(false);
          }}
          className={`text-left px-3 py-2 rounded ${
            activeSection === "blockedSlots" ? "bg-blue-600" : "hover:bg-gray-800"
          }`}
        >
          Blocked Slots
        </button>
      </nav>

      <button
        onClick={handleLogout}
        className="mt-auto text-left px-3 py-2 rounded text-red-400 hover:bg-gray-800"
      >
        Logout
      </button>
    </aside>

    {/* منطقة المحتوى */}
    <main className="flex-1 pt-16 px-4 pb-4 md:p-8 bg-gray-50 w-full overflow-x-auto">
      {activeSection === "appointments" && <AppointmentsList />}
      {activeSection === "doctors" && <DoctorsList />}
      {activeSection === "blockedSlots" && <BlockedSlotsList />}
    </main>
  </div>
);
};

export default AdminDashboard;