import { ArtistDTO } from '../artist/types';

export type TrackPageDTO = {
  last: boolean;
  first: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  numberOfElements: number;
  page: number;
  content: TrackDTO[];
};

export type TrackDTO = {
  id: string;
  title: string;
  duration: number;
  coverUrl: string;
  genre: string;
  artists: ArtistDTO[];
  file: File;
};
