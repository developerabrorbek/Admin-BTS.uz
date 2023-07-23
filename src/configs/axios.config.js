import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: "https://rjavadev.jprq.live/api/v1/",
  maxBodyLength: "Infinity",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  },
});
