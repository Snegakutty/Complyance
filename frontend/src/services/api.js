import axios from "axios";

const API = axios.create({
  baseURL: "https://complyance-1.onrender.com",
});

export default API;
