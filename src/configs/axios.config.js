import axios from "axios";
let myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`)
myHeaders.append("Content-Type", "application/json");
export const axiosInstance = axios.create({
  baseURL: "https://api.btservice.uz/api/v1/",
  headers: {
    "Content-Type" : "application/json",
    "Authorization" : `Bearer ${localStorage.getItem("token")}`
  }
});
