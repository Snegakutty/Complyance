import axios from "axios";

const API = axios.create({
  baseURL: "https://complyance-ir2u.onrender.com",
});

export default API;
