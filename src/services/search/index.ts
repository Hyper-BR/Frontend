// src/services/track/index.ts
import { AxiosPromise } from 'axios';
import { useService } from '../hooks/useService';
import { ArtistPageDTO } from '../artist/types';
import { TrackPageDTO } from '../track/types';

export const searchTracks = (
  q: string,
  page = 0,
  size = 10,
): AxiosPromise<TrackPageDTO> => {
  const { get } = useService();
  return get<TrackPageDTO>('/search/tracks', { q, page, size });
};

export const searchArtists = (
  q: string,
  page = 0,
  size = 10,
): AxiosPromise<ArtistPageDTO> => {
  const { get } = useService();
  return get<ArtistPageDTO>('/search/artists', { q, page, size });
};
