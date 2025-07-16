import { AxiosPromise } from 'axios';
import { useService } from '../hooks/useService';
import { ArtistDTO, ArtistPageDTO } from './types';

export const createArtist = (data: any): AxiosPromise<ArtistDTO> => {
  const { post } = useService();

  return post(`/artists`, data);
};

export const getArtists = (): AxiosPromise<ArtistPageDTO> => {
  const { get } = useService();

  return get(`/artists`);
};

export const getArtistById = (id: string): AxiosPromise<ArtistDTO> => {
  const { get } = useService();

  return get<ArtistDTO>(`/artist/${id}`);
};

export const searchArtistsByName = (
  query: string,
): AxiosPromise<ArtistPageDTO> => {
  const { get } = useService();

  return get<ArtistPageDTO>(`/artists`, { query });
};
