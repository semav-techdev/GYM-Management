import useCrud from "../hooks/useCrud";
import equipmentService from "../services/equipmentService";
import DataTable from "../components/DataTable";
import EntityModal from "../components/EntityModal";
import {
  notifySuccess,
  notifyWarning,
} from "../utils/toast";
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
    name: "quantity",
    label: "Quantity",
    type: "number",
    placeholder: "Number of units (e.g. 5)"
  },

  {
    name: "status",
    label: "Status",
    placeholder: "Active / Maintenance / Broken / Retired"
  },
  {
    name: "last_maintenance_date",
    label: "Last Maintenance Date",
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
  { key: "status", label: "STATUS" },
  { key: "quantity", label: "QTY" },
  { key: "location", label: "LOCATION" },
];

const EMPTY_EQUIPMENT = {
  name: "",
  type: "",
  quantity: "",
  status: "",
  last_maintenance_date: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name) {
      notifyWarning("Please enter a name");
      return;
    }

    if (!formData.type) {
      notifyWarning("Please select a type");
      return;
    }

    if (!formData.quantity) {
      notifyWarning("Please enter a quantity");
      return;
    }
    if (!formData.status) {
      notifyWarning("Please select a status");
      return;
    }
    const payload = {
      ...formData,
      quantity: Number(formData.quantity),
    };

    if (editingItem) {
      await updateItem(editingItem.id, payload);
      notifySuccess("Equipment updated successfully");
    } else {
      await addItem(payload);
      notifySuccess("Equipment added successfully");
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