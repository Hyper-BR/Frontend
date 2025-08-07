import { AxiosPromise } from 'axios';
import { useService } from '../hooks/useService';
import { ReleaseDTO, ReleasePageDTO } from './types';

export const createRelease = (data: any): AxiosPromise<ReleaseDTO> => {
  const { post } = useService();

  return post<ReleaseDTO>(`/release`, data);
};

export const getArtistReleases = (id: string): AxiosPromise<ReleasePageDTO> => {
  const { get } = useService();

  return get<ReleasePageDTO>(`/release/artist/${id}`);
};

export const getCustomerRelease = (): AxiosPromise<ReleasePageDTO> => {
  const { get } = useService();

  return get<ReleasePageDTO>(`/release/customer`);
};
