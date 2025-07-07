import { AxiosPromise } from 'axios';
import { useService } from '../hooks/useService';
import { TrackPageDTO } from './types';

export const getTracks = (): AxiosPromise<TrackPageDTO> => {
  const { get } = useService();

  return get(`/tracks`);
};

export const getTracksByArtist = (
  artistId: string,
): AxiosPromise<TrackPageDTO> => {
  const { get } = useService();

  return get(`/tracks/artist/${artistId}`);
};
