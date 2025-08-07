import { AxiosPromise } from 'axios';
import { useService } from '../hooks/useService';
import { CustomerDTO } from './types';
import { useAuth } from '@/hooks/useAuth';

export const createCustomer = (data: CustomerDTO): AxiosPromise<CustomerDTO> => {
  const { post } = useService();

  return post(`/customer`, data);
};

export const getCustomerByEmail = (email: string): AxiosPromise<CustomerDTO> => {
  const { get } = useService();

  return get(`/customer/${email}`);
};

export const updateCustomer = (id: string, data: any): AxiosPromise<CustomerDTO> => {
  const { put } = useService();

  return put(`/customer/${id}`, data);
};
