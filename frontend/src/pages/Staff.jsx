import useCrud from "../hooks/useCrud";
import staffService from "../services/staffService";
import DataTable from "../components/DataTable";
import EntityModal from "../components/EntityModal";

const STAFF_FIELDS = [
  { name: "name", label: "Name" },
  { name: "role", label: "Role" },
  { name: "email", label: "Email", type: "email" },
  { name: "phone", label: "Phone" },
  { name: "salary", label: "Salary", type: "number" },
  { name: "hire_date", label: "Hire Date" ,type: "date"},
];

const STAFF_COLUMNS = [
  { key: "name", label: "NAME" },
  { key: "role", label: "ROLE" },
  { key: "email", label: "EMAIL" },
  { key: "phone", label: "PHONE" },
  { key: "salary", label: "SALARY" },
];

const EMPTY_STAFF = {
  name: "",
  role: "",
  email: "",
  phone: "",
  salary: "",
  hire_date: "",
};

export default function Staff() {
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
  } = useCrud(staffService);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      salary: Number(formData.salary),
    };

    if (editingItem) {
      updateItem(editingItem.id, payload);
    } else {
      addItem(payload);
    }
  };

  const handleEdit = (item) => openEdit(item, EMPTY_STAFF);

  return (
    <>
      <DataTable
        title="STAFF MANAGEMENT"
        columns={STAFF_COLUMNS}
        data={items}
        loading={loading}
        search={search}
        setSearch={setSearch}
        searchPlaceholder="Search staff..."
        onEdit={handleEdit}
        onDelete={(item, name) => deleteItem(item.id, name)}
        onAdd={openAdd}
      />

      {isModalOpen && (
        <EntityModal
          title={editingItem ? "Edit Staff" : "Add Staff"}
          fields={STAFF_FIELDS}
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