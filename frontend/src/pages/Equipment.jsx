import useCrud from "../hooks/useCrud";
import equipmentService from "../services/equipmentService";
import DataTable from "../components/DataTable";
import EntityModal from "../components/EntityModal";

const EQUIPMENT_FIELDS = [
  { name: "name", label: "Equipment Name" },
  { name: "type", label: "Type" },
  { name: "purchase_date", label: "Purchase Date" },
  { name: "condition", label: "Condition" },
  { name: "quantity", label: "Quantity", type: "number" },
  { name: "location", label: "Location" },
  { name: "notes", label: "Notes" },
];

const EQUIPMENT_COLUMNS = [
  { key: "name", label: "NAME" },
  { key: "type", label: "TYPE" },
  { key: "purchase_date", label: "PURCHASED" },
  { key: "condition", label: "CONDITION" },
  { key: "quantity", label: "QTY" },
  { key: "location", label: "LOCATION" },
];

const EMPTY_EQUIPMENT = {
  name: "",
  type: "",
  purchase_date: "",
  condition: "",
  quantity: "",
  location: "",
  notes: "",
};

export default function Equipment() {
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
  } = useCrud(equipmentService);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      quantity: Number(formData.quantity),
    };

    if (editingItem) {
      updateItem(editingItem.id, payload);
    } else {
      addItem(payload);
    }
  };

  const handleEdit = (item) => openEdit(item, EMPTY_EQUIPMENT);

  return (
    <>
      <DataTable
        title="EQUIPMENT MANAGEMENT"
        columns={EQUIPMENT_COLUMNS}
        data={items}
        loading={loading}
        search={search}
        setSearch={setSearch}
        searchPlaceholder="Search equipment..."
        onEdit={handleEdit}
        onDelete={(item, name) => deleteItem(item.id, name)}
        onAdd={openAdd}
      />

      {isModalOpen && (
        <EntityModal
          title={editingItem ? "Edit Equipment" : "Add Equipment"}
          fields={EQUIPMENT_FIELDS}
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