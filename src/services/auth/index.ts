import { AxiosPromise } from 'axios';
import { useService } from '../hook/useService';
import { LoginCredentialsDTO } from './types';
import { CustomerDTO } from '../customer/types';

export const register = (data: CustomerDTO): AxiosPromise<CustomerDTO> => {
  const { post } = useService();

  return post(`/auth/register`, data);
};

export const login = (data: LoginCredentialsDTO): AxiosPromise<CustomerDTO> => {
  const { post } = useService();

  return post(`/auth/login`, data);
};

export const getMe = (): AxiosPromise<CustomerDTO> => {
  const { get } = useService();

  return get(`/auth/me`, '', '');
};

export const logout = (): AxiosPromise<void> => {
  const { post } = useService();

  return post(`/auth/logout`, '');
};
