import { AxiosPromise } from 'axios';
import { useService } from '../hooks/useService';
import { CartDTO } from './types';

export const createCart = (data: CartDTO): AxiosPromise<CartDTO> => {
  const { post } = useService();

  return post<CartDTO>(`/cart`, data);
};

export const getCustomerCarts = (): AxiosPromise<CartDTO[]> => {
  const { get } = useService();

  return get<CartDTO[]>(`/carts/customer`);
};

export const getCartTracks = (id: string): AxiosPromise<CartDTO> => {
  const { get } = useService();

  return get<CartDTO>(`/cart/${id}/tracks`);
};
