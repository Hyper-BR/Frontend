import { AxiosPromise } from 'axios';
import { useService } from '../hook/useService';
import { ArtistDTO, ArtistPageDTO } from './types';

export const createArtist = (data: any): AxiosPromise<ArtistDTO> => {
  const { post } = useService();

  return post(`/artists`, data);
};

export const getArtists = (): AxiosPromise<ArtistPageDTO> => {
  const { get } = useService();

  return get(`/artists`, '', '');
};
