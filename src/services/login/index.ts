import { AxiosPromise } from 'axios';
import { useService } from '../hook/useService';
import { LoginCredentialsDTO, LoginDTO, TokenDTO } from './types';

export const logInCustomer = (
  login: LoginCredentialsDTO,
): AxiosPromise<LoginDTO> => {
  const { post } = useService();

  return post(`/auth/login`, login);
};

export const refreshToken = (): AxiosPromise<TokenDTO> => {
  const { post } = useService();

  return post(`/auth/refresh`, '');
};
