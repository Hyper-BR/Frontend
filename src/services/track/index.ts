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

export const saveTracks = (data: any, artistId: string): AxiosPromise<any> => {
  const { post } = useService();

  console.log('---' + data.name);

  return post(`/track?artistId=${artistId}`, data);
};

export const getFileTrackById = (id: number): AxiosPromise<string> => {
  const { get } = useService();

  return get(`/track/${id}/url`, '', '');
};

export const getTrackById = (id: number): AxiosPromise<TrackDTO> => {
  const { get } = useService();

  return get(`/track/${id}`, '', '');
};
