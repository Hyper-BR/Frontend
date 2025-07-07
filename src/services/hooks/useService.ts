import api from '../axiosConfig';
import { AxiosPromise, AxiosRequestConfig } from 'axios';
import { hasFile } from '@/utils/fileUtils';

export function useService() {
  function get<T = any>(
    url: string,
    params?: Record<string, unknown>,
    config?: AxiosRequestConfig,
  ): AxiosPromise<T> {
    return api.get<T>(url, { params, ...config });
  }

  function post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): AxiosPromise<T> {
    const headers = hasFile(data)
      ? { 'Content-Type': 'multipart/form-data' }
      : { 'Content-Type': 'application/json' };

    return api.post<T>(url, data, { headers, ...config });
  }

  function put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): AxiosPromise<T> {
    return api.put<T>(url, data, config);
  }

  function patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): AxiosPromise<T> {
    return api.patch<T>(url, data, config);
  }

  function remove<T = any>(
    url: string,
    params?: Record<string, unknown>,
    config?: AxiosRequestConfig,
  ): AxiosPromise<T> {
    return api.delete<T>(url, { params, ...config });
  }

  return {
    get,
    post,
    put,
    patch,
    remove,
  };
}
