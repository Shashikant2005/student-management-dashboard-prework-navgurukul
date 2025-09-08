import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://student-dash-backend.onrender.com/api", // ✅ your backend base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
