const axios = require('axios');
import { refreshAccessToken } from './CallApi'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;

const AxiosApiInstance = axios.create();
// Request interceptor for API calls
AxiosApiInstance.interceptors.request.use(
    async config => {
        const accessToken = cookies.get(ACCESS_TOKEN);
        // const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN)
        // const value = JSON.parse(value)
        config.headers = {
            'Authorization': `${accessToken}`,
            // 'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        return config;
    },
    error => {
        Promise.reject(error)
    });

// Response interceptor for API calls
AxiosApiInstance.interceptors.response.use((response) => {
    return response
}, async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 403) {
        // console.log('originalRequest', originalRequest._retry);
        originalRequest._retry = true;
        // console.log('originalRequest', originalRequest);
        // console.log('hết hạn rồi');
        const access_token = await refreshAccessToken();
        axios.defaults.headers.common['Authorization'] = access_token;
        return AxiosApiInstance(originalRequest);
    }
    return Promise.reject(error);
});

export default AxiosApiInstance;