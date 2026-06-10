import useCrud from "../hooks/useCrud";
import equipmentService from "../services/equipmentService";
import DataTable from "../components/DataTable";
import EntityModal from "../components/EntityModal";

const EQUIPMENT_FIELDS = [
  {
    name: "name",
    label: "Equipment Name",
    placeholder: "e.g. Treadmill, Dumbbell Set"
  },
  {
    name: "type",
    label: "Type",
    placeholder: "Cardio / Strength / Machine / Free weights"
  },
  {
    name: "model",
    label: "Model",
    placeholder: "e.g. Technogym Run 700"
  },
  {
    name: "quantity",
    label: "Quantity",
    type: "number",
    placeholder: "Number of units (e.g. 5)"
  },
  {
    name: "condition",
    label: "Condition",
    placeholder: "New / Good / Worn / Damaged"
  },
  {
    name: "status",
    label: "Status",
    placeholder: "Active / Maintenance / Broken / Retired"
  },
  {
    name: "purchase_date",
    label: "Purchase Date",
    type: "date",
    placeholder: "Select purchase date"
  },
  {
    name: "last_maintenance_date",
    label: "Last Maintenance Date",
    type: "date",
    placeholder: "Optional"
  },
  {
    name: "next_maintenance_date",
    label: "Next Maintenance Date",
    type: "date",
    placeholder: "Optional"
  },
  {
    name: "location",
    label: "Location",
    placeholder: "e.g. Cardio Zone, Room A"
  },
  {
    name: "notes",
    label: "Notes",
    placeholder: "Any extra details..."
  },
];

const EQUIPMENT_COLUMNS = [
  { key: "name", label: "NAME" },
  { key: "type", label: "TYPE" },
  { key: "model", label: "MODEL" },
  { key: "purchase_date", label: "PURCHASED" },
  { key: "condition", label: "CONDITION" },
  { key: "status", label: "STATUS" },
  { key: "quantity", label: "QTY" },
  { key: "location", label: "LOCATION" },
];

const EMPTY_EQUIPMENT = {
  name: "",
  type: "",
  model: "",
  quantity: "",
  condition: "",
  status: "",
  purchase_date: "",
  last_maintenance_date: "",
  next_maintenance_date: "",
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