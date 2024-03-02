import axios from "axios";
import AxiosRateLimit from 'axios-rate-limit';
const isLocalhost = (
    window.location.hostname === 'localhost' ||
    window.location.hostname === "[::1]" ||
    window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
)
const API_URL = isLocalhost
    ? "http://localhost:5000" : "https://linksharingapp.onrender.com/";

const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: API_URL,
});

const rateLimitConfig = {
    maxRequests: 5,
    perMilliseconds: 1000,
};

const axiosWithRateLimit = AxiosRateLimit(axiosInstance, rateLimitConfig);

export const Axios = axiosWithRateLimit;