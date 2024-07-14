import axios from "axios";
export const api_url = "https://project-server-lf51.onrender.com";

const api = axios.create({
  baseURL: `${api_url}`,
});

export default api
