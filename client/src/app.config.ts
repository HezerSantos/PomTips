import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.MODE === 'production'? import.meta.env.VITE_API_URL : "http://localhost:8080",
    withCredentials: true,
    headers: {
        'Server-Id': null
    }

})

export default api