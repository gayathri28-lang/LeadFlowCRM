import api from "../api/api";

const getHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getAllLeads = async () => {
  const response = await api.get("/leads", getHeaders());
  return response.data;
};

export const createLead = async (leadData) => {
  const response = await api.post("/leads", leadData, getHeaders());
  return response.data;
};

export const updateLead = async (id, leadData) => {
  const response = await api.put(
    `/leads/${id}`,
    leadData,
    getHeaders()
  );
  return response.data;
};

export const deleteLead = async (id) => {
  const response = await api.delete(
    `/leads/${id}`,
    getHeaders()
  );
  return response.data;
};

export const searchLeads = async (query) => {
  const response = await api.get(
    `/leads?search=${query}`,
    getHeaders()
  );

  return response.data;
};




































































