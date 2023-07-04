import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: "https://api.btservice.uz/api/v1/",
  "maxBodyLength" : "Infinity",
  headers: {
    "Content-Type" : "application/json",
    // "Authorization" : `Bearer ${localStorage.getItem("token")}`,
  }
});
