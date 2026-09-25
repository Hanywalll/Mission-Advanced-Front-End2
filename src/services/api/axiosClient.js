import axios from 'axios';

/**
 * Axios instance terpusat dengan Base URL dari environment variable (.env)
 * Sesuai dengan instruksi STEP 2: Mengimplementasikan API Call & Interceptors
 */
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const apiClient = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 10000,
});

// Request Interceptor: Logging & centralized request configuration
apiClient.interceptors.request.use(
  (config) => {
    // Tambahkan timestamp atau auth token jika diperlukan
    const timestamp = new Date().toLocaleTimeString();
    console.log(`[API Request] [${timestamp}] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    console.error('[API Request Error]:', error);
    return Promise.reject(error);
  }
);

// Response Interceptor: Menangani response dan error secara terpusat
apiClient.interceptors.response.use(
  (response) => {
    console.log(`[API Response] ${response.status} ${response.config.url}`, response.data);
    return response;
  },
  (error) => {
    const errorMsg = error.response?.data?.message || error.message || 'Terjadi kesalahan pada server';
    console.error(`[API Response Error] ${error.response?.status || 'Network Error'}:`, errorMsg);
    return Promise.reject({
      status: error.response?.status,
      message: errorMsg,
      originalError: error,
    });
  }
);

export default apiClient;
