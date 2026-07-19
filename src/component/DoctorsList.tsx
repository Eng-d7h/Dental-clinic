import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import DoctorScheduleModal from "./DoctorScheduleModal";

type Doctor = {
  id: number;
  name: string;
  specialty: string;
};

const DoctorsList = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [name, setName] = useState("");
  const [specialty, setSpecialty] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editSpecialty, setEditSpecialty] = useState("");

  const [scheduleDoctor, setScheduleDoctor] = useState<Doctor | null>(null);

  const fetchDoctors = async () => {
    try {
      const res = await fetch("http://localhost:5000/doctors");
      const data = await res.json();
      setDoctors(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");

    try {
      const res = await fetch("http://localhost:5000/doctors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, specialty }),
      });

      if (!res.ok) {
        alert("Failed to add doctor");
        return;
      }

      setName("");
      setSpecialty("");
      fetchDoctors();
    } catch (err) {
      alert("Something went wrong");
    }
  };

  const startEditing = (doctor: Doctor) => {
    setEditingId(doctor.id);
    setEditName(doctor.name);
    setEditSpecialty(doctor.specialty);
  };

  const handleUpdate = async (id: number) => {
    const token = localStorage.getItem("adminToken");

    try {
      const res = await fetch(`http://localhost:5000/doctors/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: editName, specialty: editSpecialty }),
      });

      if (!res.ok) {
        alert("Failed to update doctor");
        return;
      }

      setEditingId(null);
      fetchDoctors();
    } catch (err) {
      alert("Something went wrong");
    }
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure? Doctors with existing appointments cannot be deleted."
    );
    if (!confirmDelete) return;

    const token = localStorage.getItem("adminToken");

    try {
      const res = await fetch(`http://localhost:5000/doctors/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        alert("Failed to delete doctor. They may have existing appointments.");
        return;
      }

      fetchDoctors();
    } catch (err) {
      alert("Something went wrong");
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Doctors</h2>

      <form
        onSubmit={handleAdd}
        className="bg-white p-4 rounded shadow mb-6 flex flex-wrap gap-3 items-end"
      >
        <div>
          <label className="block text-sm mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border rounded px-2 py-1"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Specialty</label>
          <input
            type="text"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            required
            className="border rounded px-2 py-1"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700"
        >
          Add Doctor
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow rounded min-w-[600px]">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Specialty</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doc) => (
              <tr key={doc.id} className="border-t">
                {editingId === doc.id ? (
                  <>
                    <td className="p-3">
                      <input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="border rounded px-2 py-1 w-full"
                      />
                    </td>
                    <td className="p-3">
                      <input
                        value={editSpecialty}
                        onChange={(e) => setEditSpecialty(e.target.value)}
                        className="border rounded px-2 py-1 w-full"
                      />
                    </td>
                    <td className="p-3 flex gap-3">
                      <button
                        onClick={() => handleUpdate(doc.id)}
                        className="text-green-600 hover:underline"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="text-gray-600 hover:underline"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="p-3">{doc.name}</td>
                    <td className="p-3">{doc.specialty}</td>
                    <td className="p-3 flex gap-3">
                      <button
                        onClick={() => startEditing(doc)}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(doc.id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => setScheduleDoctor(doc)}
                        className="text-purple-600 hover:underline"
                      >
                        Schedule
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {scheduleDoctor && (
        <DoctorScheduleModal
          doctorId={scheduleDoctor.id}
          doctorName={scheduleDoctor.name}
          onClose={() => setScheduleDoctor(null)}
        />
      )}
    </div>
  );
};

export default DoctorsList;