import { useEffect, useState } from "react";

type Appointment = {
  id: number;
  patientName: string;
  patientPhone: string;
  date: string;
  startTime: string;
  status: string;
  doctorId: number;
};

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  type FilterStatus = "all" | "pending" | "cancelled";
const [filter, setFilter] = useState<FilterStatus>("all");
  // دالة تجيب الحجوزات من السيرفر
  const fetchAppointments = async () => {
    try {
      const res = await fetch("http://localhost:5000/appointments");
      const data = await res.json();
      setAppointments(data);
    } catch (err) {
      setError("Failed to load appointments");
    } finally {
      setIsLoading(false);
    }
  };

  // نجيب الحجوزات أول ما المكوّن يفتح
  useEffect(() => {
    fetchAppointments();
  }, []);

  // دالة إلغاء حجز
  const handleCancel = async (id: number) => {
    const token = localStorage.getItem("adminToken");

    try {
      const res = await fetch(`http://localhost:5000/appointments/${id}/cancel`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        alert("Failed to cancel appointment");
        return;
      }

      // بعد نجاح الإلغاء، نحدّث القائمة من جديد
      fetchAppointments();
    } catch (err) {
      alert("Something went wrong");
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  const filteredAppointments = appointments.filter((appt) => {
  if (filter === "all") return true;
  return appt.status === filter;
});


const handleDelete = async (id: number) => {
  const token = localStorage.getItem("adminToken");
  try {
    const res = await fetch(`http://localhost:5000/appointments/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      alert("Failed to delete appointment");
      return;
    }

    fetchAppointments();
  } catch (err) {
    alert("Something went wrong");
  }
};




  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Appointments</h2>

      <div className="flex gap-2 mb-4">
  <button
    onClick={() => setFilter("all")}
    className={`px-4 py-1.5 rounded ${
      filter === "all" ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-gray-200"
    }`}
  >
    All
  </button>
  <button
    onClick={() => setFilter("pending")}
    className={`px-4 py-1.5 rounded ${
      filter === "pending" ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-gray-200"
    }`}
  >
    Active
  </button>
  <button
    onClick={() => setFilter("cancelled")}
    className={`px-4 py-1.5 rounded ${
      filter === "cancelled" ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-gray-200"
    }`}
  >
    Cancelled
  </button>
</div>
<div className="overflow-x-auto">

      <table className="w-full border-collapse bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">Patient</th>
            <th className="p-3">Phone</th>
            <th className="p-3">Date</th>
            <th className="p-3">Time</th>
            <th className="p-3">Status</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredAppointments.map((appt) => (
            <tr key={appt.id} className="border-t">
              <td className="p-3">{appt.patientName}</td>
              <td className="p-3">{appt.patientPhone}</td>
              <td className="p-3">{appt.date.slice(0, 10)}</td>
              <td className="p-3">{appt.startTime}</td>
              <td className="p-3">{appt.status}</td>
              <td className="p-3 flex gap-3">
  {appt.status !== "cancelled" && (
    <button
      onClick={() => handleCancel(appt.id)}
      className="text-orange-600 hover:underline"
    >
      Cancel
    </button>
  )}
  <button
    onClick={() => handleDelete(appt.id)}
    className="text-red-600 hover:underline"
  >
    Delete
  </button>
</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

    </div>
  );
};

export default AppointmentsList;