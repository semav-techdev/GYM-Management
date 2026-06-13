import { useEffect, useMemo, useState } from "react";
import useCrud from "../hooks/useCrud";
import memberService from "../services/memberService";
import planService from "../services/planService";
import DataTable from "../components/DataTable";
import EntityModal from "../components/EntityModal";
import WeightCalendarCard from "../components/WeightCalendarCard";
import {
  notifySuccess,
  notifyWarning,
} from "../utils/toast";

const MEMBER_COLUMNS = [
  { key: "name", label: "NAME" },
  { key: "age", label: "AGE" },
  { key: "plan", label: "PLAN" }, // This expects plan.plan_name or plan.name from response
  { key: "join_date", label: "JOIN DATE" },
  { key: "expiry_date", label: "EXPIRE DATE" },
  {
    key: "is_active",
    label: "ACTIVE",
    render: (item) => (item.is_active ? "Active" : "Inactive"),
  },
  { key: "phone", label: "PHONE" },
  {
    key: "weight",
    label: "WEIGHT",
    render: (item) => (
      <span className="text-blue-600 font-semibold cursor-pointer hover:underline">
        📊 Track
      </span>
    ),
  },
];

const EMPTY_MEMBER = {
  name: "",
  age: "",
  plan_id: "", // Changed from "plan" to "plan_id"
  join_date: "",
  expiry_date: "",
  phone: "",
  notes: "",
  actions: "",
  is_active: true, // Add default
};

export default function Members() {
  const {
    items,
    loading,
    saving,
    search,
    setSearch,
    editingItem,
    isModalOpen,
    formData,
    addItem,
    updateItem,
    deleteItem,
    openAdd,
    openEdit,
    closeModal,
    handleInputChange,
  } = useCrud(memberService);

  const [weightMember, setWeightMember] = useState(null);
  const [plans, setPlans] = useState([]);
  const [plansLoading, setPlansLoading] = useState(true);

  useEffect(() => {
    const loadPlans = async () => {
      try {
        setPlansLoading(true);
        const response = await planService.getActive();
        setPlans(response.data);
      } catch (error) {
        console.error("Failed to load plans:", error);
      } finally {
        setPlansLoading(false);
      }
    };

    loadPlans();
  }, []);

  const memberFields = useMemo(() => [
    { name: "name", label: "Name", placeholder: "Member's full name" },
    { name: "age", label: "Age", type: "number", placeholder: "e.g. 25" },
    {
      name: "plan_id", // Keep as plan_id
      label: "Plan",
      type: "select",
      loading: plansLoading,
      options: plans.map((plan) => ({
        value: plan.id, // Use plan.id as value, not plan.name
        label: `${plan.name} - $${plan.price.toFixed(2)}/${plan.duration}`,
      })),
    },
    { name: "phone", label: "Phone", placeholder: "e.g. +1234567890" },
    { name: "join_date", label: "Join Date", type: "date" },
    { name: "expiry_date", label: "Expire Date", type: "date" },
    { name: "notes", label: "Notes", placeholder: "Additional information" },
    { name: "actions", label: "Actions", placeholder: "Optional actions" },
  ], [plans, plansLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) {
    notifyWarning("Name is required");
    return;
    }

    if (!formData.plan_id) {
      notifyWarning("Please select a plan");
      return;
    }
    if (!formData.join_date) {
      notifyWarning("Please select a join date");
      return;
    }
    if (!formData.expiry_date) {
      notifyWarning("Please select an expiry date");
      return;
    }
    const payload = {
      ...formData,
      age: formData.age ? Number(formData.age) : null,
      // Ensure plan_id is sent as number or null
      plan_id: formData.plan_id ? Number(formData.plan_id) : null,
    };

    if (editingItem) {
      await updateItem(editingItem.id, payload);
      notifySuccess("Member updated successfully");
    } else {
      await addItem(payload);
      notifySuccess("Member added successfully");
    }
  };

  const handleEdit = (item) => {
    // Transform the item to match form structure
    const editData = {
      ...EMPTY_MEMBER,
      ...item,
      plan_id: item.plan?.id || item.plan_id || "", // Handle both possible structures
    };
    openEdit(editData, EMPTY_MEMBER);
  };

  const handleWeightClick = (item) => {
    setWeightMember(item);
  };

  // Transform items for display to show plan name
  const displayItems = items.map(item => ({
    ...item,
    plan: item.plan?.name || item.plan_name || "No Plan", // Display plan name
  }));

  return (
    <>
      <DataTable
        title="MEMBERS MANAGEMENT"
        columns={MEMBER_COLUMNS}
        data={displayItems} // Use transformed items
        loading={loading}
        search={search}
        setSearch={setSearch}
        searchPlaceholder="Search members..."
        onEdit={handleEdit}
        onDelete={(item, name) => deleteItem(item.id, name)}
        onAdd={() => openAdd(EMPTY_MEMBER)}
        onRowClick={(item, columnKey) => {
          if (columnKey === "weight") {
            handleWeightClick(item);
          }
        }}
      />

      {isModalOpen && (
        <EntityModal
          title={editingItem ? "Edit Member" : "Add Member"}
          fields={memberFields}
          formData={formData}
          onChange={handleInputChange}
          onSubmit={handleSubmit}
          onClose={closeModal}
          saving={saving}
        />
      )}

      {weightMember && (
        <WeightCalendarCard
          member={weightMember}
          onClose={() => setWeightMember(null)}
        />
      )}
    </>
  );
}