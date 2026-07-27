import axios from 'axios';

// Use relative path so Nginx handles the reverse proxying correctly
const API = axios.create({
    baseURL: '/api',
});

API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        // Fixed typo from 'Barear' to 'Bearer'
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export default API;