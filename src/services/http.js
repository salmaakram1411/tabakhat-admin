import axios from "axios";

const axiosConfig = axios.create({
    baseURL: "http://localhost:4000/api/",
    headers: {
        authorization: localStorage.getItem("token")
    }
});

export default axiosConfig;