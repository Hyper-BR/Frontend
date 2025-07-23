import { AxiosPromise } from 'axios';
import { useService } from '../hooks/useService';
import { PlaylistDTO } from './types';

export const createPlaylist = (data: PlaylistDTO): AxiosPromise<PlaylistDTO> => {
  const { post } = useService();

  return post(`/playlists`, data);
};

export const getPlaylistsCustomer = (): AxiosPromise<PlaylistDTO[]> => {
  const { get } = useService();

  return get<PlaylistDTO[]>(`/playlists/customer`);
};

export const getTrackPlaylists = (trackId: string): AxiosPromise<PlaylistDTO[]> => {
  const { get } = useService();

  return get(`/playlists/track/${trackId}`);
};

export const getPlaylistById = (id: string): AxiosPromise<PlaylistDTO> => {
  const { get } = useService();

  return get(`/playlists/${id}`);
};

export const addTrackToPlaylist = (playlistId: string, trackId: string): AxiosPromise<PlaylistDTO> => {
  const { post } = useService();

  return post(`/playlist/${playlistId}/track/${trackId}`, '');
};

export const removeTrackFromPlaylist = async (playlistId: string, trackId: string) => {
  const { remove } = useService();

  return remove(`/playlist/${playlistId}/track/${trackId}`);
};
