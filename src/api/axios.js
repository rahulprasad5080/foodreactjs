import axios from 'axios';

//backend api new 

const API = axios.create({
    baseURL: 'https://tasknodejsfood-production.up.railway.app/api',
    withCredentials: true,
});

API.interceptors.request.use((req) => {
    // Token is now handled via HTTP-only cookie automatically
    return req;
});

export default API;
