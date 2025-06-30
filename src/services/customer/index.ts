import { AxiosPromise } from 'axios';
import { useService } from '../hook/useService';
import { CustomerDTO, LoginCredentialsDTO, LoginDTO, TokenDTO } from './types';

export const createCustomer = (
  data: CustomerDTO,
): AxiosPromise<CustomerDTO> => {
  const { post } = useService();

  return post(`/customer`, data);
};

export const logInCustomer = (
  login: LoginCredentialsDTO,
): AxiosPromise<LoginDTO> => {
  const { post } = useService();

  return post(`/customer/login`, login);
};

export const refreshToken = (): AxiosPromise<TokenDTO> => {
  const { post } = useService();

  return post(`/customer/refresh`, '');
};

export const getCustomerByEmail = (
  email: string,
): AxiosPromise<CustomerDTO> => {
  const { get } = useService();

  return get(`/customer/${email}`, '', '');
};
