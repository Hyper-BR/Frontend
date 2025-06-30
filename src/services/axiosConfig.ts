import axios from 'axios';
import {
  InternalServerErrorException,
  NetworkException,
  NotFoundException,
  ConflictException,
} from '../exceptions';
import { translateMessage } from '../utils/errorMessages';
import { parseCookies } from 'nookies';

const { token } = parseCookies();

const api = axios.create({
  baseURL: 'http://44.213.164.140:8080', //TODO ENVs
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

if (token !== 'null') {
  api.defaults.headers['Authorization'] = `Bearer ${token}`;
}

api.interceptors.response.use(
  (response) => {
    return Promise.resolve(response);
  },
  (error) => {
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
