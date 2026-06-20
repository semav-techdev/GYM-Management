import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import weightService from "../services/weightService";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function WeightCalendarCard({ member, onClose }) {
  const [year, setYear] = useState(new Date().getFullYear());
  const [calendarData, setCalendarData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingMonth, setEditingMonth] = useState(null);

  const [editForm, setEditForm] = useState({
    weight_before: "",
    weight_after: "",
  });

  useEffect(() => {
    if (member) {
      loadCalendar();
    }
  }, [year, member]);

  const loadCalendar = async () => {
    try {
      setLoading(true);
      const response = await weightService.getMemberCalendar(
        member.id,
        year
      );

      setCalendarData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (monthData) => {
    setEditingMonth(monthData.month);

    setEditForm({
      weight_before: monthData.weight_before || "",
      weight_after: monthData.weight_after || "",
    });
  };

  const handleSave = async (monthKey) => {
    try {
      const [yearStr, monthStr] = monthKey.split("-");
      const recordDate = `${yearStr}-${monthStr}-01`;

      const existingMonth = calendarData.find(
        (m) => m.month === monthKey
      );

      if (existingMonth?.has_record) {
        const records = await weightService.getMemberRecords(
          member.id
        );

        const existing = records.data.find((r) =>
          r.record_date.startsWith(monthKey)
        );

        if (existing) {
          await weightService.updateRecord(existing.id, {
            weight_before: editForm.weight_before
              ? Number(editForm.weight_before)
              : null,
            weight_after: editForm.weight_after
              ? Number(editForm.weight_after)
              : null,
          });
        }
      } else {
        await weightService.createRecord({
          member_id: member.id,
          record_date: recordDate,
          weight_before: editForm.weight_before
            ? Number(editForm.weight_before)
            : null,
          weight_after: editForm.weight_after
            ? Number(editForm.weight_after)
            : null,
        });
      }

      setEditingMonth(null);
      loadCalendar();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (monthKey) => {
    try {
      const records = await weightService.getMemberRecords(
        member.id
      );

      const existing = records.data.find((r) =>
        r.record_date.startsWith(monthKey)
      );

      if (existing) {
        await weightService.deleteRecord(existing.id);
        loadCalendar();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getMonthName = (monthKey) => {
    const monthIndex =
      parseInt(monthKey.split("-")[1], 10) - 1;

    return MONTHS[monthIndex];
  };

  return (
    <AnimatePresence>
      {member && (
        <motion.div
          initial={{ x: 500, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 500, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-4 right-4 z-50 w-[450px] h-[95vh]"
        >
          <div className="h-full bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-800 to-red-900 p-5 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold">
                    {member.name}
                  </h2>

                  <p className="text-red-100 text-sm">
                    Weight Progress Tracker
                  </p>
                </div>

                <button
                  onClick={onClose}
                  className="text-white text-2xl hover:scale-110 transition"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Member Info */}
            <div className="grid grid-cols-3 gap-3 p-4 border-b">
              <div className="bg-red-50 rounded-xl p-3 text-center">
                <p className="text-xs text-slate-500">
                  Plan
                </p>
                <p className="font-semibold text-sm">
                  {member.plan}
                </p>
              </div>

              <div className="bg-green-50 rounded-xl p-3 text-center">
                <p className="text-xs text-slate-500">
                  Age
                </p>
                <p className="font-semibold">
                  {member.age}
                </p>
              </div>

              <div className="bg-purple-50 rounded-xl p-3 text-center">
                <p className="text-xs text-slate-500">
                  Active
                </p>
                <p className="font-semibold">
                  {member.is_active ? "Yes" : "No"}
                </p>
              </div>
            </div>

            {/* Year Selector */}
            <div className="p-4 flex justify-center items-center gap-3 border-b">
              <button
                onClick={() => setYear((y) => y - 1)}
                className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200"
              >
                ←
              </button>

              <span className="font-bold text-lg text-red-900">
                {year}
              </span>

              <button
                onClick={() => setYear((y) => y + 1)}
                className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200"
              >
                →
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {loading ? (
                <div className="text-center py-20">
                  Loading...
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {calendarData.map((monthData) => (
                    <div
                      key={monthData.month}
                      className={`rounded-2xl p-4 border transition-all hover:shadow-lg hover:-translate-y-1 ${
                        monthData.has_record
                          ? "bg-gradient-to-br from-red-50 to-red-900 border-red-200"
                          : "bg-slate-50 border-slate-200"
                      }`}
                    >
                      <div className="flex justify-between mb-3">
                        <h3 className="font-bold text-sm">
                          {getMonthName(monthData.month)}
                        </h3>

                        {monthData.has_record && (
                          <span className="text-[10px] bg-red-900 text-white px-2 py-1 rounded-full">
                            Recorded
                          </span>
                        )}
                      </div>

                      {editingMonth === monthData.month ? (
                        <>
                          <input
                            type="number"
                            placeholder="Before"
                            value={editForm.weight_before}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                weight_before:
                                  e.target.value,
                              })
                            }
                            className="w-full border rounded-lg px-2 py-1 mb-2"
                          />

                          <input
                            type="number"
                            placeholder="After"
                            value={editForm.weight_after}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                weight_after:
                                  e.target.value,
                              })
                            }
                            className="w-full border rounded-lg px-2 py-1 mb-2"
                          />

                          <div className="flex gap-2">
                            <button
                              onClick={() =>
                                handleSave(monthData.month)
                              }
                              className="flex-1 bg-green-500 text-white rounded-lg py-1"
                            >
                              Save
                            </button>

                            <button
                              onClick={() =>
                                setEditingMonth(null)
                              }
                              className="flex-1 bg-gray-300 rounded-lg py-1"
                            >
                              Cancel
                            </button>
                          </div>
                        </>
                      ) : monthData.has_record ? (
                        <>
                          <div className="text-sm">
                            <div className="flex justify-between">
                              <span>Before</span>

                              <span className="font-semibold text-red-500">
                                {monthData.weight_before ??
                                  "-"}{" "}
                                kg
                              </span>
                            </div>

                            <div className="flex justify-between">
                              <span>After</span>

                              <span className="font-semibold text-green-600">
                                {monthData.weight_after ??
                                  "-"}{" "}
                                kg
                              </span>
                            </div>
                          </div>

                          {monthData.weight_before &&
                            monthData.weight_after && (
                              <div className="mt-3 text-center">
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                                    monthData.weight_after <=
                                    monthData.weight_before
                                      ? "bg-green-100 text-green-700"
                                      : "bg-red-100 text-red-700"
                                  }`}
                                >
                                  {monthData.weight_after <=
                                  monthData.weight_before
                                    ? `↓ ${(
                                        monthData.weight_before -
                                        monthData.weight_after
                                      ).toFixed(1)} kg`
                                    : `↑ ${(
                                        monthData.weight_after -
                                        monthData.weight_before
                                      ).toFixed(1)} kg`}
                                </span>
                              </div>
                            )}

                          <div className="flex gap-2 mt-3">
                            <button
                              onClick={() =>
                                handleEditClick(monthData)
                              }
                              className="flex-1 bg-blue-500 text-white rounded-lg py-1 text-xs"
                            >
                              Edit
                            </button>

                            <button
                              onClick={() =>
                                handleDelete(
                                  monthData.month
                                )
                              }
                              className="flex-1 bg-red-500 text-white rounded-lg py-1 text-xs"
                            >
                              Delete
                            </button>
                          </div>
                        </>
                      ) : (
                        <div className="text-center">
                          <p className="text-xs text-slate-400 mb-2">
                            No Record
                          </p>

                          <button
                            onClick={() =>
                              handleEditClick(monthData)
                            }
                            className="bg-red-900 text-white px-3 py-1 rounded-lg text-xs"
                          >
                            Add Weight
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}