import { AxiosPromise } from 'axios';
import { useService } from '../hooks/useService';
import { InsightsDTO } from './types';

export const getInsights = (): AxiosPromise<InsightsDTO> => {
  const { get } = useService();

  return get(`/insights`);
};
