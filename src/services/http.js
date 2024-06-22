import axios from "axios";

let axiosConfig = axios.create({
    baseURL: "http://localhost:4000/api/",
    headers: {
        authorization: localStorage.getItem("token")
    }
});

export function updateAxios() {
    axiosConfig = axios.create({
        baseURL: "http://localhost:4000/api/",
        headers: {
            authorization: localStorage.getItem("token")
        }
    }); 
}

export default axiosConfig;