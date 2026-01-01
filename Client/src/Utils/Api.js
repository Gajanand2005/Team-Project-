import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';



const getAccessToken = () => localStorage.getItem('accessToken');
const getRefreshToken = () => localStorage.getItem('refreshToken');

const clearStoredTokens = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
};

const mergeConfig = (config = {}, defaultHeaders = {}) => {
    const { headers, ...rest } = config;
    return {
        headers: {
            ...defaultHeaders,
            ...(headers || {})
        },
        ...rest
    };
};

const normalizeError = (error) => {
    if (!error) {
        return { message: 'Unknown error', error: true, success: false };
    }

    if (error?.error !== undefined) {
        return error;
    }

    if (error?.message) {
        return {
            message: error.message,
            error: true,
            success: false
        };
    }

    return {
        message: 'Request failed',
        error: true,
        success: false
    };
};

const apiClient = axios.create({
    baseURL: apiUrl,
    withCredentials: true
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(({ resolve, reject }) => {
        if (error) {
            reject(error);
        } else {
            resolve(token);
        }
    });
    failedQueue = [];
};

const refreshAccessToken = async () => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
        throw new Error('Missing refresh token');
    }

    const response = await axios.post(
        `${apiUrl}/api/user/refresh-token`,
        {},
        {
            headers: {
                'Content-Type': 'application/json',
                'x-refresh-token': refreshToken
            },
            withCredentials: true
        }
    );

    const newToken = response?.data?.data?.accessToken;

    if (!newToken) {
        throw new Error('Unable to refresh access token');
    }

    localStorage.setItem('accessToken', newToken);
    return newToken;
};

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

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config || {};
        const status = error?.response?.status;

        if (
            status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url?.includes('/api/user/login') &&
            !originalRequest.url?.includes('/api/user/register')
        ) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        if (token) {
                            originalRequest.headers.Authorization = `Bearer ${token}`;
                        } else {
                            delete originalRequest.headers.Authorization;
                        }
                        return apiClient(originalRequest);
                    })
                    .catch((queueError) => Promise.reject(queueError));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            if (!getRefreshToken()) {
                clearStoredTokens();
                return Promise.reject(error);
            }

            try {
                const newToken = await refreshAccessToken();
                processQueue(null, newToken);
                originalRequest.headers = originalRequest.headers || {};
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return apiClient(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError, null);
                clearStoredTokens();
                return Promise.reject(
                    refreshError?.response?.data ? refreshError.response.data : refreshError
                );
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error?.response?.data ? error.response.data : error);
    }
);

export const postData = async (url, payload, config = {}) => {
    try {
        const response = await apiClient.post(
            url,
            payload,
            mergeConfig(config, { 'Content-Type': 'application/json' })
        );
        return response.data;
    } catch (error) {
        console.log(error);
        return normalizeError(error);
    }
};

export const fetchDataFromApi = async (url, config = {}) => {
    try {
        const { data } = await apiClient.get(url, config);
        return data;
    } catch (error) {
        console.log(error);
        return normalizeError(error);
    }
};

export const uploadImage = async (url, formData, config = {}) => {
    try {
        const response = await apiClient.post(
            url,
            formData,
            mergeConfig(config, { 'Content-Type': 'multipart/form-data' })
        );
        return response.data;
    } catch (error) {
        console.log(error);
        return normalizeError(error);
    }
};

export const editData = async (url, updatedData, config = {}) => {
    try {
        const response = await apiClient.put(
            url,
            updatedData,
            mergeConfig(config, { 'Content-Type': 'application/json' })
        );
        return response.data;
    } catch (error) {
        console.log(error);
        return normalizeError(error);
    }
};

export const deleteData = async (url, config = {}) => {
    try {
        const { data } = await apiClient.delete(url, config);
        return data;
    } catch (error) {
        console.log(error);
        return normalizeError(error);
    }
};

