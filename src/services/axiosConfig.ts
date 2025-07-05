import axios from 'axios';
import {
  InternalServerErrorException,
  NetworkException,
  NotFoundException,
  ConflictException,
} from '@/exceptions';
import { translateMessage } from '@/utils/errorMessages';
import { logout } from './auth';

const api = axios.create({
  baseURL: process.env.API_URL,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
  },
});
api.interceptors.response.use(
  (response) => {
    return Promise.resolve(response);
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/auth/refresh')
    ) {
      originalRequest._retry = true;

      try {
        await axios.post(
          '/auth/refresh',
          {},
          {
            baseURL: api.defaults.baseURL,
            withCredentials: true,
          },
        );

        return api(originalRequest);
      } catch (refreshError) {
        logout();
        if (refreshError.response?.status === 401) {
          return Promise.reject(
            new NetworkException('Sessão expirada', refreshError.response),
          );
        }
        return Promise.reject(refreshError);
      }
    }

    if (error.response) {
      switch (error.response.status) {
        case 404:
          return Promise.reject(new NotFoundException(null, error.response));
        case 409:
          const errorMessage = error.response?.data?.details?.[0];
          const translatedMessage = translateMessage(errorMessage);
          return Promise.reject(
            new ConflictException(translatedMessage, error.response),
          );
        case 500:
          return Promise.reject(
            new InternalServerErrorException(null, error.response),
          );
        default:
          return Promise.reject(new NetworkException(null, error.response));
      }
    } else {
      return Promise.reject(new NetworkException(null, error.response));
    }
  },
);

export default api;
