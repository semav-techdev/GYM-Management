import { useState, useEffect, useMemo, useCallback } from "react";

export default function useCrud(service, options = {}) {
  const { searchField = "name" } = options;

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});

  // ── Load ──
  const loadItems = useCallback(async () => {
    setLoading(true);
    try {
      const data = await service.getAll();
      setItems(data);
    } catch (err) {
      console.error("Error loading items:", err);
      alert("Could not load data");
    } finally {
      setLoading(false);
    }
  }, [service]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  // ── Search/Filter ──
  const filteredItems = useMemo(() => {
    const normalized = search.trim().toLowerCase();
    if (!normalized) return items;
    return items.filter((item) =>
      item[searchField]?.toLowerCase().includes(normalized)
    );
  }, [items, search, searchField]);

  // ── CRUD Operations ──
  const addItem = useCallback(
    async (data) => {
      setSaving(true);
      try {
        const created = await service.create(data);
        setItems((prev) => [...prev, created]);
        setIsModalOpen(false);
        setEditingItem(null);
        return created;
      } catch (err) {
        console.error("Error creating item:", err);
        alert("Could not save item");
        throw err;
      } finally {
        setSaving(false);
      }
    },
    [service]
  );

  const updateItem = useCallback(
    async (id, data) => {
      setSaving(true);
      try {
        const updated = await service.update(id, data);
        setItems((prev) => prev.map((item) => (item.id === id ? updated : item)));
        setIsModalOpen(false);
        setEditingItem(null);
        return updated;
      } catch (err) {
        console.error("Error updating item:", err);
        alert("Could not update item");
        throw err;
      } finally {
        setSaving(false);
      }
    },
    [service]
  );

  const deleteItem = useCallback(
    async (id, itemName) => {
      const confirmed = window.confirm(`Delete ${itemName}?`);
      if (!confirmed) return false;

      try {
        await service.remove(id);
        setItems((prev) => prev.filter((item) => item.id !== id));
        return true;
      } catch (err) {
        console.error("Error deleting item:", err);
        alert("Could not delete item");
        return false;
      }
    },
    [service]
  );

  // ── Modal Helpers ──
  const openAdd = useCallback(() => {
    setEditingItem(null);
    setFormData({});
    setIsModalOpen(true);
  }, []);

  const openEdit = useCallback((item, emptyForm) => {
    setEditingItem(item);
    setFormData(
      Object.keys(emptyForm).reduce((acc, key) => {
        acc[key] = item[key] ?? "";
        return acc;
      }, {})
    );
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData({});
  }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  return {
    // Data
    items: filteredItems,
    allItems: items,
    loading,
    saving,
    // Search
    search,
    setSearch,
    // Modal state
    editingItem,
    isModalOpen,
    formData,
    // Actions
    loadItems,
    addItem,
    updateItem,
    deleteItem,
    openAdd,
    openEdit,
    closeModal,
    handleInputChange,
  };
}