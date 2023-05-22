import store from '@/store';
import axios from 'axios';

export const request = axios.create({
    baseURL: "http://localhost:3000/",
    headers: {
        Authorization: `Bearer ${store.getters["getToken"]}`
    }
})