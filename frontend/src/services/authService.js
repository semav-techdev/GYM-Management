import api from "../lib/axios"

export const loginUser = async (data) => {
  const response = await api.post(
    "/",
    data
  );

  return response.data;
};