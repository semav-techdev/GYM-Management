import { useState, useEffect, useMemo } from "react";
import { Search } from "lucide-react";
import planService from "../services/planService";

export default function Plans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    duration: "monthly",
    description: "",
  });
  const [showPlanWarning, setShowPlanWarning] = useState(false);
  const [membersUsingPlan, setMembersUsingPlan] = useState([]);
  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    try {
      setLoading(true);
      const response = await planService.getAll();
      setPlans(response.data);
    } catch (error) {
      console.error("Failed to load plans:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      price: parseFloat(formData.price),
    };

    try {
      if (editingPlan) {
        await planService.update(editingPlan.id, payload);
      } else {
        await planService.create(payload);
      }
      setIsModalOpen(false);
      setEditingPlan(null);
      setFormData({ name: "", price: "", duration: "monthly", description: "" });
      loadPlans();
    } catch (error) {
      console.error("Failed to save plan:", error);
      alert("Failed to save plan");
    }
  };

  const handleEdit = (plan) => {
    setEditingPlan(plan);
    setFormData({
      name: plan.name,
      price: plan.price.toString(),
      duration: plan.duration || "monthly",
      description: plan.description || "",
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
  if (!window.confirm("Are you sure?")) return;

  try {
    await planService.delete(id);
    console.log(planService.delete(id));
    loadPlans();
  } catch (error) {
    console.error("Failed to delete:", error);

    if (error.response?.status === 409) {
      setMembersUsingPlan(error.response.data.detail.members || []);
      setShowPlanWarning(true);
    } }
};

  const handleToggle = async (id) => {
    try {
      await planService.toggle(id);
      loadPlans();
    } catch (error) {
      console.error("Failed to toggle:", error);
    }
  };

  const filteredPlans = useMemo(() => {
    const normalized = search.trim().toLowerCase();

    if (!normalized) return plans;

    return plans.filter((plan) =>
      [plan.name, plan.duration, plan.description]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(normalized))
    );
  }, [plans, search]);

  return (
    <div className="px-5 py-8">
      <div className="flex justify-center mb-12">
        <div className="bg-gray-700/80 rounded-full w-full max-w-[650px] px-6 py-4 flex items-center gap-4 backdrop-blur-lg">
          <Search className="text-gray-300" />
          <input
            type="text"
            placeholder="Search plans..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none flex-1 text-white placeholder:text-gray-300"
          />
        </div>
      </div>
    
{/* show members if exist */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-white text-3xl mb-8">PLAN & PRICE MANAGEMENT</h1>
        
      </div>

      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : filteredPlans.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No plans found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPlans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded p-4 flex h-full min-h-56 flex-col ${
                plan.is_active ? "bg-white" : "bg-gray-100 opacity-60"
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">{plan.name}</h3>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    plan.is_active
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {plan.is_active ? "Active" : "Inactive"}
                </span>
              </div>
              
              <div className="text-2xl font-bold text-red-900 mb-1">
                ${plan.price.toFixed(2)}
              </div>
              <div className="text-sm text-gray-500 mb-2 capitalize">
                / {plan.duration}
              </div>
              
              {plan.description && (
                <p className="text-sm text-gray-600 mb-3">{plan.description}</p>
              )}
              
              <div className="flex gap-2 mt-auto pt-3">
                <button
                  onClick={() => handleEdit(plan)}
                  className="flex-1 bg-red-900 text-white text-sm py-1 rounded hover:bg-red-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleToggle(plan.id)}
                  className={`flex-1 text-sm py-1 rounded ${
                    plan.is_active
                      ? "bg-yellow-500 text-white hover:bg-yellow-600"
                      : "bg-green-500 text-white hover:bg-green-600"
                  }`}
                >
                  {plan.is_active ? "Disable" : "Enable"}
                </button>
                <button
                  onClick={() => handleDelete(plan.id)}
                  className="flex-1 bg-red-500 text-white text-sm py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">     
          <div className="bg-gradient-to-br from-red-50 to-red-900 border-red-200 rounded-lg p-6 w-full max-w-md
                animate-in fade-in zoom-in-95 duration-200">           
            <h2 className="text-xl font-bold mb-4">
              {editingPlan ? "Edit Plan" : "Add Plan"}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Plan Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                  required
                  placeholder="e.g., Basic, VIP, Premium"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                  required
                  placeholder="29.99"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Duration</label>
                <select
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                  <option value="weekly">Weekly</option>
                  <option value="daily">Daily</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                  rows="2"
                  placeholder="Optional description..."
                />
              </div>
              
              <div className="flex gap-2 mt-4">
                <button
                  type="submit"
                  className="flex-1 bg-red-900 text-white py-2 rounded hover:bg-red-600"
                >
                  {editingPlan ? "Update" : "Create"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="flex justify-center mt-6">
        <button
                onClick={() => {
                    setEditingPlan(null);
                    setFormData({ name: "", price: "", duration: "monthly", description: "" });
                    setIsModalOpen(true);
                }}
                className="bg-red-900  px-4 py-2 rounded-2xl text-white border border-rose-50 hover:bg-red-800">
          + Add Plan
        </button>
      </div>
      {showPlanWarning && (
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setShowPlanWarning(false)}
          >
            <div
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-red-600 mb-2">
                Cannot Delete Plan
              </h3>

              <p className="text-gray-600 mb-4">
                This plan is currently assigned to
                <span className="font-semibold">
                  {" "}
                  {membersUsingPlan.length}
                </span>{" "}
                member(s):
              </p>

              <div className="max-h-48 overflow-y-auto space-y-2 mb-4">
                {membersUsingPlan.map((member) => (
                  <div
                    key={member.id}
                    className="bg-gray-100 p-3 rounded-lg"
                  >
                    👤 {member.name}
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowPlanWarning(false)}
                className="w-full bg-red-900 text-white py-2 rounded-lg hover:bg-red-700"
              >
                Close
              </button>
            </div>
          </div>
        )}
    </div>
    
  );
}
