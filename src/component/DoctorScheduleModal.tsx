import { useEffect, useState } from "react";

type DayName =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";

const DAYS: { label: DayName; value: number }[] = [
  { label: "Sunday", value: 0 },
  { label: "Monday", value: 1 },
  { label: "Tuesday", value: 2 },
  { label: "Wednesday", value: 3 },
  { label: "Thursday", value: 4 },
  { label: "Friday", value: 5 },
  { label: "Saturday", value: 6 },
];

type DayEntry = {
  enabled: boolean;
  startTime: string;
  endTime: string;
};

type ScheduleRecord = {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
};

type Props = {
  doctorId: number;
  doctorName: string;
  onClose: () => void;
};

const DoctorScheduleModal = ({ doctorId, doctorName, onClose }: Props) => {
  // نجهّز حالة أولية لكل الأيام السبعة (كلها معطّلة افتراضيًا)
  const [days, setDays] = useState<Record<number, DayEntry>>(() => {
    const initial: Record<number, DayEntry> = {};
    DAYS.forEach((d) => {
      initial[d.value] = { enabled: false, startTime: "09:00", endTime: "17:00" };
    });
    return initial;
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // نجيب الدوام الحالي للطبيب ونعبّي الفورم فيه
  useEffect(() => {
    fetch(`http://localhost:5000/doctors/${doctorId}/schedule`)
      .then((res) => res.json())
      .then((data: ScheduleRecord[]) => {
        setDays((prev) => {
          const updated = { ...prev };
          data.forEach((record) => {
            updated[record.dayOfWeek] = {
              enabled: true,
              startTime: record.startTime,
              endTime: record.endTime,
            };
          });
          return updated;
        });
      })
      .finally(() => setIsLoading(false));
  }, [doctorId]);

  const toggleDay = (dayValue: number) => {
    setDays((prev) => ({
      ...prev,
      [dayValue]: { ...prev[dayValue], enabled: !prev[dayValue].enabled },
    }));
  };

  const updateTime = (
    dayValue: number,
    field: "startTime" | "endTime",
    value: string
  ) => {
    setDays((prev) => ({
      ...prev,
      [dayValue]: { ...prev[dayValue], [field]: value },
    }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem("adminToken");

    // نبني المصفوفة اللي بنرسلها: بس الأيام المفعّلة
    const scheduleToSend = DAYS.filter((d) => days[d.value].enabled).map(
      (d) => ({
        dayOfWeek: d.value,
        startTime: days[d.value].startTime,
        endTime: days[d.value].endTime,
      })
    );

    setIsSaving(true);

    try {
      const res = await fetch(
        `http://localhost:5000/doctors/${doctorId}/schedule`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ schedule: scheduleToSend }),
        }
      );

      if (!res.ok) {
        alert("Failed to save schedule");
        setIsSaving(false);
        return;
      }

      onClose();
    } catch (err) {
      alert("Something went wrong");
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-bold mb-4">
          Schedule for {doctorName}
        </h3>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="space-y-3">
            {DAYS.map((day) => (
              <div
                key={day.value}
                className="flex items-center gap-3 border-b pb-2"
              >
                <input
                  type="checkbox"
                  checked={days[day.value].enabled}
                  onChange={() => toggleDay(day.value)}
                />
                <span className="w-24">{day.label}</span>

                {days[day.value].enabled && (
                  <>
                    <input
                      type="time"
                      value={days[day.value].startTime}
                      onChange={(e) =>
                        updateTime(day.value, "startTime", e.target.value)
                      }
                      className="border rounded px-2 py-1"
                    />
                    <span>to</span>
                    <input
                      type="time"
                      value={days[day.value].endTime}
                      onChange={(e) =>
                        updateTime(day.value, "endTime", e.target.value)
                      }
                      className="border rounded px-2 py-1"
                    />
                  </>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving || isLoading}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save Schedule"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorScheduleModal;