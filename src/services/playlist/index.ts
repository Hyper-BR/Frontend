import { AxiosPromise } from 'axios';
import { useService } from '../hook/useService';
import { PlaylistDTO } from './types';

export const createPlaylist = (
  data: PlaylistDTO,
): AxiosPromise<PlaylistDTO> => {
  const { post } = useService();

  return post(`/playlists`, data);
};

export const getPlaylistsCustomer = (): AxiosPromise<PlaylistDTO[]> => {
  const { get } = useService();

  return get(`/playlists/customer`, '', '');
};
