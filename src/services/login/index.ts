import { AxiosPromise } from 'axios';
import { useService } from '../hook/useService';
import { LoginCredentialsDTO } from './types';
import { CustomerDTO } from '../customer/types';

export const logInCustomer = (
  login: LoginCredentialsDTO,
): AxiosPromise<CustomerDTO> => {
  const { post } = useService();

  return post(`/auth/login`, login);
};

export const getAuthenticatedCustomer = (): AxiosPromise<CustomerDTO> => {
  const { get } = useService();

  return get(`/auth/me`, '', '');
};

export const logoutCustomer = (): AxiosPromise<void> => {
  const { post } = useService();

  return post(`/auth/logout`, '');
};
