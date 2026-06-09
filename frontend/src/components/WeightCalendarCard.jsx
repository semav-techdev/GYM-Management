import { useState, useEffect } from "react";
import weightService from "../services/weightService";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function WeightCalendarCard({ member, onClose }) {
  const [year, setYear] = useState(new Date().getFullYear());
  const [calendarData, setCalendarData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingMonth, setEditingMonth] = useState(null);
  const [editForm, setEditForm] = useState({ weight_before: "", weight_after: "" });

  useEffect(() => {
    loadCalendar();
  }, [year, member.id]);

  const loadCalendar = async () => {
    try {
      setLoading(true);
      const response = await weightService.getMemberCalendar(member.id, year);
      setCalendarData(response.data);
    } catch (error) {
      console.error("Failed to load weight calendar:", error);
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
    const [yearStr, monthStr] = monthKey.split("-");
    const recordDate = `${yearStr}-${monthStr}-01`;
    
    try {
      if (calendarData.find(m => m.month === monthKey)?.has_record) {
        // Update existing - need to find the record ID first
        const records = await weightService.getMemberRecords(member.id);
        const existing = records.data.find(r => r.record_date.startsWith(monthKey));
        if (existing) {
          await weightService.updateRecord(existing.id, {
            weight_before: editForm.weight_before ? parseFloat(editForm.weight_before) : null,
            weight_after: editForm.weight_after ? parseFloat(editForm.weight_after) : null,
          });
        }
      } else {
        // Create new
        await weightService.createRecord({
          member_id: member.id,
          record_date: recordDate,
          weight_before: editForm.weight_before ? parseFloat(editForm.weight_before) : null,
          weight_after: editForm.weight_after ? parseFloat(editForm.weight_after) : null,
        });
      }
      setEditingMonth(null);
      loadCalendar();
    } catch (error) {
      console.error("Failed to save weight record:", error);
      alert("Failed to save weight record");
    }
  };

  const handleDelete = async (monthKey) => {
    if (!window.confirm("Delete this weight record?")) return;
    
    try {
      const records = await weightService.getMemberRecords(member.id);
      const existing = records.data.find(r => r.record_date.startsWith(monthKey));
      if (existing) {
        await weightService.deleteRecord(existing.id);
        loadCalendar();
      }
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  const getMonthName = (monthKey) => {
    const monthIndex = parseInt(monthKey.split("-")[1]) - 1;
    return MONTHS[monthIndex];
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Weight Tracker: {member.name}
            </h2>
            <p className="text-sm text-gray-500">Plan: {member.plan}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Year Selector */}
        <div className="p-4 flex justify-center gap-2">
          <button
            onClick={() => setYear(y => y - 1)}
            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded"
          >
            ← {year - 1}
          </button>
          <span className="px-4 py-1 font-bold text-lg text-blue-600">{year}</span>
          <button
            onClick={() => setYear(y => y + 1)}
            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded"
          >
            {year + 1} →
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="p-4">
          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {calendarData.map((monthData) => (
                <div
                  key={monthData.month}
                  className={`border rounded-lg p-4 ${
                    monthData.has_record
                      ? "border-blue-300 bg-blue-50"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-bold text-gray-700">
                      {getMonthName(monthData.month)}
                    </h3>
                    {monthData.has_record && (
                      <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded">
                        Recorded
                      </span>
                    )}
                  </div>

                  {editingMonth === monthData.month ? (
                    <div className="space-y-2">
                      <div>
                        <label className="text-xs text-gray-500">Before (kg)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={editForm.weight_before}
                          onChange={(e) =>
                            setEditForm({ ...editForm, weight_before: e.target.value })
                          }
                          className="w-full border rounded px-2 py-1 text-sm"
                          placeholder="Weight before"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500">After (kg)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={editForm.weight_after}
                          onChange={(e) =>
                            setEditForm({ ...editForm, weight_after: e.target.value })
                          }
                          className="w-full border rounded px-2 py-1 text-sm"
                          placeholder="Weight after"
                        />
                      </div>
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => handleSave(monthData.month)}
                          className="flex-1 bg-green-500 text-white text-sm py-1 rounded hover:bg-green-600"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingMonth(null)}
                          className="flex-1 bg-gray-300 text-gray-700 text-sm py-1 rounded hover:bg-gray-400"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      {monthData.has_record ? (
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Before:</span>
                            <span className="font-semibold text-red-600">
                              {monthData.weight_before ? `${monthData.weight_before} kg` : "-"}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">After:</span>
                            <span className="font-semibold text-green-600">
                              {monthData.weight_after ? `${monthData.weight_after} kg` : "-"}
                            </span>
                          </div>
                          {monthData.weight_before && monthData.weight_after && (
                            <div className="mt-2 pt-2 border-t text-center">
                              <span
                                className={`text-sm font-bold ${
                                  monthData.weight_after <= monthData.weight_before
                                    ? "text-green-600"
                                    : "text-red-600"
                                }`}
                              >
                                {monthData.weight_after <= monthData.weight_before
                                  ? `↓ ${(monthData.weight_before - monthData.weight_after).toFixed(1)} kg`
                                  : `↑ ${(monthData.weight_after - monthData.weight_before).toFixed(1)} kg`}
                              </span>
                            </div>
                          )}
                          <div className="flex gap-2 mt-3">
                            <button
                              onClick={() => handleEditClick(monthData)}
                              className="flex-1 bg-blue-500 text-white text-xs py-1 rounded hover:bg-blue-600"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(monthData.month)}
                              className="flex-1 bg-red-500 text-white text-xs py-1 rounded hover:bg-red-600"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-2">
                          <p className="text-sm text-gray-400 mb-2">No record</p>
                          <button
                            onClick={() => handleEditClick(monthData)}
                            className="bg-blue-500 text-white text-xs px-3 py-1 rounded hover:bg-blue-600"
                          >
                            Add Weight
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}