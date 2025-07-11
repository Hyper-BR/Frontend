import { AxiosPromise } from 'axios';
import { useService } from '../hooks/useService';
import { SubscriptionDTO } from './types';

export const getSubscripions = (): AxiosPromise<SubscriptionDTO[]> => {
  const { get } = useService();
  return get<SubscriptionDTO[]>('/subscriptions');
};
