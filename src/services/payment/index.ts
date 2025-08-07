import { AxiosPromise } from 'axios';
import { useService } from '../hooks/useService';
import { PaymentDTO } from './types';
import { SubscriptionDTO } from '../subscriptions/types';

export const upgradeSubscription = (data: SubscriptionDTO): AxiosPromise<PaymentDTO> => {
  const { post } = useService();
  return post<PaymentDTO>('/payment/subscription/checkout', data);
};

export const confirmPayment = (sessionId: string): AxiosPromise<Object> => {
  const { post } = useService();
  return post<PaymentDTO>(`/payment/subscription/confirm?sessionId=${sessionId}`);
};
