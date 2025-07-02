import { AxiosPromise } from 'axios';
import { useService } from '../hook/useService';
import { PlaylistDTO } from './types';

export const createPlaylist = (
  data: PlaylistDTO,
): AxiosPromise<PlaylistDTO> => {
  const { post } = useService();

  return post(`/playlist`, data);
};

export const getPlaylistsCustomer = (): AxiosPromise<PlaylistDTO[]> => {
  const { get } = useService();

  return get(`/playlist/customer`, '', '');
};
