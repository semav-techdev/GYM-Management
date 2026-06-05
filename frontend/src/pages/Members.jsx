import useCrud from "../hooks/useCrud";
import memberService from "../services/memberService";
import DataTable from "../components/DataTable";
import EntityModal from "../components/EntityModal";

const MEMBER_FIELDS = [
  { name: "name", label: "Name" },
  { name: "age", label: "Age", type: "number" },
  { name: "plan", label: "Plan" },
  { name: "phone", label: "Phone" },
  { name: "join_date", label: "Join Date" },
  { name: "expiry_date", label: "Expire Date" },
  { name: "notes", label: "Notes" },
  { name: "actions", label: "Actions" },
];

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
        onAdd={openAdd}
      />

      {isModalOpen && (
        <EntityModal
          title={editingItem ? "Edit Member" : "Add Member"}
          fields={MEMBER_FIELDS}
          formData={formData}
          onChange={handleInputChange}
          onSubmit={handleSubmit}
          onClose={closeModal}
          saving={saving}
        />
      )}
    </>
  );
}