import { TrackDTO } from '../track/types';

export type PlaylistPageDTO = {
  last: boolean;
  first: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  numberOfElements: number;
  page: number;
  content: PlaylistDTO[];
};

export type PlaylistDTO = {
  id: string;
  name: string;
  description: string;
  image: string;
  tracks: TrackDTO[];
};
