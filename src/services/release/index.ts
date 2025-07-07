import { AxiosPromise } from 'axios';
import { useService } from '../hooks/useService';
import { ReleaseDTO } from './types';

export const createRelease = (data: any): AxiosPromise<ReleaseDTO> => {
  const { post } = useService();

  return post(`/release`, data);
};
