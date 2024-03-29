import axios from 'axios';
import {
  InternalServerErrorException,
  NetworkException,
  NotFoundException,
  ConflictException,
} from '../exceptions';
import { translateMessage } from '../utils/errorMessages';

const api = axios.create({
  baseURL: 'localhost:8080', //TODO ENVs
});

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
