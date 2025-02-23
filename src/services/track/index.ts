import { AxiosPromise } from 'axios';
import { useService } from '../hook/useService';
import { TrackDTO, TrackPageDTO } from './types';

export const getTracks = (): AxiosPromise<TrackPageDTO> => {
  const { get } = useService();

  return get(`/track`, '', '');
};

export const getTracksByArtistUsername = (
  username: string,
): AxiosPromise<TrackPageDTO> => {
  const { get } = useService();

  return get(`/artist/${username}`, '', '');
};

export const saveTracks = (data: any): AxiosPromise<any> => {
  const { post } = useService();

  return post(`/track?artistId=${data.artistId}`, data);
};

export const getFileTrackById = (id: number): AxiosPromise<string> => {
  const { get } = useService();

  return get(`/track/${id}/url`, '', '');
};

export const getTrackById = (id: number): AxiosPromise<TrackDTO> => {
  const { get } = useService();

  return get(`/track/${id}`, '', '');
};
