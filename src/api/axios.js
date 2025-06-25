import axios from 'axios';
import { store } from '../redux/store'; // ✅ import đúng kiểu named
import { logout, setAccessToken } from '../redux/slices/authSlice';

export const BASE_URL = 'https://chat-app-api-unyl.onrender.com';

const instance = axios.create({
  // baseURL: 'http://localhost:3000/api',
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Đính access token vào mỗi request
instance.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Tự động refresh token nếu access token hết hạn
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
    //    const res = await axios.post('http://localhost:3000/api/auth/refresh', { refreshToken });
        const res = await axios.post(`${BASE_URL}/api/auth/refresh`, { refreshToken });
        const newAccessToken = res.data.accessToken;

        // Cập nhật store + localStorage
        store.dispatch(setAccessToken(newAccessToken));
        localStorage.setItem('accessToken', newAccessToken);

        // Gửi lại request gốc
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      } catch (err) {
        store.dispatch(logout());
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
