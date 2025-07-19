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
  id?: string;
  title: string;
  file: File;
  genre: string;
  tags: string[];
  privacy: string;
  type: string;
  key?: string;
  coverUrl?: string;
  duration?: number;
  createdDate?: string;
  bpm?: string;
  price?: number;
  plays?: number;
  artists: ArtistDTO[];
};
