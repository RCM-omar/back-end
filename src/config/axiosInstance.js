import axios from "axios";



const axiosInstance = axios.create({
  baseURL: process.env.EXTERNAL_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    // 'Authorization': `Bearer ${API_KEY}`,
  },
});

export default axiosInstance;
