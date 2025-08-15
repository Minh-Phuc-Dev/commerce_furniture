import axios from "axios";

const interceptor = axios.create({
    baseURL: import.meta.env.VITE_API,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true,
});

export default interceptor;
