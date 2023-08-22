import axios from "axios";

const jwt = localStorage.getItem("jwt");
const baseUrl = "https://localhost:44364/";
const api = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: `Bearer ${jwt}`,
  },
});
export const baseApiUrl = baseUrl;
export default api;
