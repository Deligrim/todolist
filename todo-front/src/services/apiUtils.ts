import axios, { AxiosError } from "axios";
// import { logout } from "state/slices/authSlice";
// import { store } from "state/store";



const baseAxiosConfig = {
    baseURL: process.env.REACT_APP_API_URL,
    headers: { 'content-type': 'application/x-www-form-urlencoded' }
};
export const publicApiConfig = axios.create(baseAxiosConfig);
export const adminApiConfig = axios.create(baseAxiosConfig);

adminApiConfig.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
export interface ApiError extends Error {
    code?: number;
    message: string;
}

export const handleApiError = (error: AxiosError): ApiError => {
    if (axios.isAxiosError(error)) {
        const errorResponseData = error.response?.data as { error: string; };
        return {
            name: "ApiError",
            code: error.response?.status,
            message: errorResponseData?.error || "Network error"
        };
    }
    return {
        name: "ApiError",
        message: "Unknown error"
    };
};
