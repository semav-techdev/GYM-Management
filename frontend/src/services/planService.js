import api from "../lib/axios";

const planService = {
  getAll: () => api.get("/plans/"),
  getActive: () => api.get("/plans/?active_only=true"),
  create: (data) => api.post("/plans/", data),
  update: (id, data) => api.put(`/plans/${id}`, data),
  delete: (id) => api.delete(`/plans/${id}`),
  toggle: (id) => api.patch(`/plans/${id}/toggle`),
};

export default planService;
