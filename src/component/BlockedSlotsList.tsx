import { useEffect, useState } from "react";
import type { FormEvent } from "react";

type Doctor = {
  id: number;
  name: string;
};

type BlockedSlot = {
  id: number;
  doctorId: number;
  date: string;
  startTime: string;
  reason: string | null;
  doctor: Doctor;
};

const BlockedSlotsList = () => {
  const [blockedSlots, setBlockedSlots] = useState<BlockedSlot[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // بيانات الفورم
  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [reason, setReason] = useState("");

  const fetchBlockedSlots = async () => {
    try {
      const res = await fetch("http://localhost:5000/blocked-slots");
      const data = await res.json();
      setBlockedSlots(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDoctors = async () => {
    try {
      const res = await fetch("http://localhost:5000/doctors");
      const data = await res.json();
      setDoctors(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBlockedSlots();
    fetchDoctors();
  }, []);

  // إضافة وقت معطل جديد
  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");

    try {
      const res = await fetch("http://localhost:5000/blocked-slots", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          doctorId: Number(doctorId),
          date,
          startTime,
          reason,
        }),
      });

      if (!res.ok) {
        alert("Failed to block time slot");
        return;
      }

      // نفرّغ الفورم ونحدّث القائمة
      setDoctorId("");
      setDate("");
      setStartTime("");
      setReason("");
      fetchBlockedSlots();
    } catch (err) {
      alert("Something went wrong");
    }
  };

  // حذف تعطيل
  const handleDelete = async (id: number) => {
    const token = localStorage.getItem("adminToken");

    try {
      const res = await fetch(`http://localhost:5000/blocked-slots/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        alert("Failed to unblock time slot");
        return;
      }

      fetchBlockedSlots();
    } catch (err) {
      alert("Something went wrong");
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Blocked Slots</h2>

      {/* فورم الإضافة */}
      <form
  onSubmit={handleAdd}
  className="bg-white p-4 rounded shadow mb-6 flex flex-col md:flex-row flex-wrap gap-3 md:items-end"
>
        <div className="w-full md:w-auto">
          <label className="block text-sm mb-1">Doctor</label>
          <select
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            required
            className="border rounded px-2 py-1"
          >
            <option value="">Select doctor</option>
            {doctors.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.name}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full md:w-auto">
          <label className="block text-sm mb-1">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="border rounded px-2 py-1"
          />
        </div>

        <div className="w-full md:w-auto">
          <label className="block text-sm mb-1">Time</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
            className="border rounded px-2 py-1"
          />
        </div>

        <div className="w-full md:w-auto">
          <label className="block text-sm mb-1">Reason (optional)</label>
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700"
        >
          Block
        </button>
      </form>

      {/* جدول الأوقات المعطلة */}
      <div className="overflow-x-auto">

      <table className="w-full border-collapse bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">Doctor</th>
            <th className="p-3">Date</th>
            <th className="p-3">Time</th>
            <th className="p-3">Reason</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {blockedSlots.map((slot) => (
            <tr key={slot.id} className="border-t">
              <td className="p-3">{slot.doctor?.name}</td>
              <td className="p-3">{slot.date.slice(0, 10)}</td>
              <td className="p-3">{slot.startTime}</td>
              <td className="p-3">{slot.reason || "-"}</td>
              <td className="p-3">
                <button
                  onClick={() => handleDelete(slot.id)}
                  className="text-red-600 hover:underline"
                >
                  Unblock
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

export default BlockedSlotsList;