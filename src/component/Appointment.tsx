import { CalendarDays } from "lucide-react";
import { useState, useEffect } from "react";

interface Doctor {
  id: number;
  name: string;
  specialty: string;
}



interface Slot {
  time: string;
  available: boolean;
}

export default function Appointment() {
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [date, setDate] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsMessage, setSlotsMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // جلب الأطباء والخدمات عند فتح الصفحة
  useEffect(() => {
    fetch("http://localhost:5000/doctors")
      .then((res) => res.json())
      .then((data) => setDoctors(data))
      .catch((err) => console.error("خطأ بجلب الأطباء:", err));

    
  }, []);

  // جلب الأوقات المتاحة كل ما يتغير الطبيب أو التاريخ
  useEffect(() => {
    if (!doctorId || !date) {
      setSlots([]);
      return;
    }

    setSlotsLoading(true);
    setSlotsMessage("");
    setSelectedTime(""); // نفرّغ الوقت المختار سابقًا لو غيّر الطبيب أو التاريخ

    fetch(`http://localhost:5000/doctors/${doctorId}/availability?date=${date}`)
      .then((res) => res.json())
      .then((data) => {
        setSlots(data.slots || []);
        if (data.message) setSlotsMessage(data.message);
      })
      .catch(() => setSlotsMessage("The time isn't available"))
      .finally(() => setSlotsLoading(false));
  }, [doctorId, date]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedTime) {
      setMessage("Choose the time");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientName,
          patientPhone,
          doctorId: Number(doctorId),
          date,
          startTime: selectedTime,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Try again...");
      } else {
        setMessage("Booking successful...");
        setPatientName("");
        setPatientPhone("");
        setDate("");
        setDoctorId("");
        setSelectedTime("");
        setSlots([]);
      }
    } catch (error) {
      setMessage("Server is not working...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="appointment" className="bg-[#516EFF] py-12 md:py-20 px-4 md:px-6 mt-10">
  <div className="max-w-6xl mx-auto">
    <div className="text-center text-white mb-8 md:mb-12">
      <CalendarDays size={44} className="mx-auto mb-4 md:w-[55px] md:h-[55px]" />
      <h2 className="text-3xl md:text-5xl font-bold">Book Your Appointment</h2>
      <p className="mt-4 text-base md:text-lg text-gray-100">
            Fill out the form below and our team will contact you shortly.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-10 shadow-xl">
          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Full Name"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              required
              className="border rounded-xl p-4 outline-none focus:border-[#516EFF]"
            />

            <input
              type="tel"
              placeholder="Phone Number"
              value={patientPhone}
              onChange={(e) => setPatientPhone(e.target.value)}
              required
              className="border rounded-xl p-4 outline-none focus:border-[#516EFF]"
            />

            <select
              value={doctorId}
              onChange={(e) => setDoctorId(e.target.value)}
              required
              className="w-full border rounded-xl p-4 outline-none focus:border-[#516EFF]"
            >
              <option value="">Select Doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name} - {doctor.specialty}
                </option>
              ))}
            </select>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="border rounded-xl p-3 outline-none focus:border-[#516EFF]"
            />
          </div>

          {/* شبكة الأوقات المتاحة */}
          {doctorId && date && (
            <div className="mt-6">
              <p className="font-semibold mb-3 text-gray-700">Choose The Time </p>

              {slotsLoading && <p className="text-gray-500">Loading...</p>}

              {!slotsLoading && slotsMessage && (
                <p className="text-red-500">{slotsMessage}</p>
              )}

              {!slotsLoading && slots.length > 0 && (
                <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
                  {slots.map((slot) => (
                    <button
                      key={slot.time}
                      type="button"
                      disabled={!slot.available}
                      onClick={() => setSelectedTime(slot.time)}
                      className={`
                        p-3 rounded-xl border text-sm font-medium transition
                        ${!slot.available ? "bg-gray-100 text-gray-400 cursor-not-allowed" : ""}
                        ${slot.available && selectedTime !== slot.time ? "bg-white text-gray-700 hover:border-[#516EFF]" : ""}
                        ${selectedTime === slot.time ? "bg-[#516EFF] text-white border-[#516EFF]" : ""}
                      `}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          

          {message && (
            <p className="text-center mt-4 font-semibold text-[#516EFF]">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="block mx-auto mt-8 bg-[#516EFF] text-white px-10 py-4 rounded-xl hover:bg-blue-700 duration-300 disabled:opacity-50"
          >
            {loading ? "Booking in progress..." : "Book Appointment"}
          </button>
        </form>
      </div>
    </section>
  );
}