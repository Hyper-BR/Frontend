import { AxiosPromise } from 'axios';
import { useService } from '../hook/useService';
import { CustomerDTO } from './types';

export const createCustomer = (
  data: CustomerDTO,
): AxiosPromise<CustomerDTO> => {
  const { post } = useService();

  return post(`/customer`, data);
};

export const getCustomerByEmail = (
  email: string,
): AxiosPromise<CustomerDTO> => {
  const { get } = useService();

  return get(`/customer/${email}`, '', '');
};
