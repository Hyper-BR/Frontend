import { AxiosPromise } from 'axios';
import { useService } from '../hooks/useService';
import { TrackDTO, TrackPageDTO } from './types';

export const getTracks = (): AxiosPromise<TrackPageDTO> => {
  const { get } = useService();

  return get(`/tracks`);
};

export const getTracksByArtist = (
  artistId: string,
): AxiosPromise<TrackPageDTO> => {
  const { get } = useService();

  return get<TrackPageDTO>(`/tracks/artist/${artistId}`);
};

export const getTrackById = (id: string): AxiosPromise<TrackDTO> => {
  const { get } = useService();

  return get<TrackDTO>(`/track/${id}`);
};
