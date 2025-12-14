import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';

/* ================= TOKENS ================= */
const getAccessToken = () => localStorage.getItem('adminAccessToken');
const getRefreshToken = () => localStorage.getItem('adminRefreshToken');

/* ================= COOKIE TOKENS ================= */
const getCookieAccessToken = () => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; adminAccessToken=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};
const getCookieRefreshToken = () => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; adminRefreshToken=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

const clearStoredTokens = () => {
  localStorage.removeItem('adminAccessToken');
  localStorage.removeItem('adminRefreshToken');
};

/* ================= AXIOS INSTANCE ================= */
const apiClient = axios.create({
  baseURL: apiUrl,
  withCredentials: true
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    error ? reject(error) : resolve(token);
  });
  failedQueue = [];
};

/* ================= REFRESH TOKEN (ADMIN) ================= */
const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) throw new Error('Missing admin refresh token');

  const response = await axios.post(
    `${apiUrl}/api/admin/auth/refresh-token`,
    {},
    {
      headers: {
        'x-refresh-token': refreshToken
      },
      withCredentials: true
    }
  );

  const newToken = response?.data?.data?.accessToken;
  if (!newToken) throw new Error('Unable to refresh admin access token');

  localStorage.setItem('adminAccessToken', newToken);
  return newToken;
};

/* ================= REQUEST INTERCEPTOR ================= */
apiClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* ================= RESPONSE INTERCEPTOR ================= */
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config || {};
    const status = error?.response?.status;

    if (
      status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes('/api/admin/auth/login')
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return apiClient(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newToken = await refreshAccessToken();
        processQueue(null, newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      } catch (err) {
        processQueue(err, null);
        clearStoredTokens();
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error?.response?.data || error);
  }
);

/* ================= EXPORT HELPERS ================= */
export const postData = (url, payload, config = {}) =>
  apiClient.post(url, payload, config).then(res => res.data);

export const fetchDataFromApi = (url, config = {}) =>
  apiClient.get(url, config).then(res => res.data);

export const editData = (url, payload, config = {}) =>
  apiClient.put(url, payload, config).then(res => res.data);

export const deleteData = (url, config = {}) =>
  apiClient.delete(url, config).then(res => res.data);

export const uploadImage = (url, formData, config = {}) =>
  apiClient.post(url, formData, config).then(res => res.data);

export const deleteImages = async (url, config = {}) => {
    try {
        const { data } = await apiClient.delete(url, config);
        return data;
    } catch (error) {
        console.log(error);
        return normalizeError(error);
    }
};


export const deleteWithData = async (url, payload, config = {}) => {
    try {
        const mergedConfig = mergeConfig(config, { 'Content-Type': 'application/json' });
        const response = await apiClient.delete(url, {
            ...mergedConfig,
            data: payload
        });
        return response.data;
    } catch (error) {
        console.log(error);
        return normalizeError(error);
    }
};


