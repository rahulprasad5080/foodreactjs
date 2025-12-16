import axios from 'axios';

const API = axios.create({
    baseURL: 'https://tasknodejsfood-production.up.railway.app/api',
});

API.interceptors.request.use((req) => {
    if (localStorage.getItem('token')) {
        req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    }
    return req;
});

export default API;
