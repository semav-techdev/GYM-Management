import { useEffect, useMemo, useState } from "react";
import useCrud from "../hooks/useCrud";
import memberService from "../services/memberService";
import planService from "../services/planService";
import DataTable from "../components/DataTable";
import EntityModal from "../components/EntityModal";
import WeightCalendarCard from "../components/WeightCalendarCard";

const MEMBER_COLUMNS = [
  { key: "name", label: "NAME" },
  { key: "age", label: "AGE" },
  { key: "plan", label: "PLAN" },
  { key: "join_date", label: "JOIN DATE" },
  { key: "expiry_date", label: "EXPIRE DATE" },
  {
    key: "is_active",
    label: "ACTIVE",
    render: (item) => (item.is_active ? "Active" : "Inactive"),
  },
  { key: "phone", label: "PHONE" },
  // NEW: Weight column that opens the calendar card
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
  plan: "",
  join_date: "",
  expiry_date: "",
  phone: "",
  notes: "",
  actions: "",
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
    { name: "name", label: "Name" },
    { name: "age", label: "Age", type: "number" },
    {
      name: "plan",
      label: "Plan",
      type: "select",
      loading: plansLoading,
      options: plans.map((plan) => ({
        value: plan.name,
        label: `${plan.name} - $${plan.price.toFixed(2)}/${plan.duration}`,
      })),
    },
    { name: "phone", label: "Phone" },
    { name: "join_date", label: "Join Date", type: "date" },
    { name: "expiry_date", label: "Expire Date", type: "date" },
    { name: "notes", label: "Notes" },
    { name: "actions", label: "Actions" },
  ], [plans, plansLoading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      age: Number(formData.age),
    };

    if (editingItem) {
      updateItem(editingItem.id, payload);
    } else {
      addItem(payload);
    }
  };

  const handleEdit = (item) => openEdit(item, EMPTY_MEMBER);

  // NEW: Handle weight column click
  const handleWeightClick = (item) => {
    setWeightMember(item);
  };

  return (
    <>
      <DataTable
        title="MEMBERS MANAGEMENT"
        columns={MEMBER_COLUMNS}
        data={items}
        loading={loading}
        search={search}
        setSearch={setSearch}
        searchPlaceholder="Search members..."
        onEdit={handleEdit}
        onDelete={(item, name) => deleteItem(item.id, name)}
        onAdd={() => openAdd(EMPTY_MEMBER)}
        // NEW: Pass click handler for weight column
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

      {/* NEW: Weight Calendar Card Modal */}
      {weightMember && (
        <WeightCalendarCard
          member={weightMember}
          onClose={() => setWeightMember(null)}
        />
      )}
    </>
  );
}
