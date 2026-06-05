export const createCrudService = (endpoint, api) => ({
    getAll: async () => {
        const res = await api.get(endpoint);
        return res.data;
    },

    create: async (data) => {
        const res = await api.post(endpoint, data);
        return res.data;
    },

    update: async (id, data) => {
        const res = await api.put(`${endpoint}/${id}`, data);
        return res.data;
    },

    remove: async (id) => {
        await api.delete(`${endpoint}/${id}`);
    },
    });