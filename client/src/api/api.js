import axios from "axios";

const api = axios.create({
  baseURL: "https://leadflowcrm-backend.onrender.com/api",
});

export default api;