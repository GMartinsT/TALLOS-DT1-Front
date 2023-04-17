import axios from 'axios';

export const request = axios.create({
    baseURL: "http://localhost:3000/",
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
    }
})