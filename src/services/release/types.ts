import { ArtistDTO } from '../artist/types';

export type ReleasePageDTO = {
  last: boolean;
  first: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  numberOfElements: number;
  page: number;
  content: ReleaseDTO[];
};

export type ReleaseDTO = {
  id: number;
  title: string;
  type: string;
  image: string;
  genre: string;
  artist: ArtistDTO;
  coverUrl: string;
  file?: File;
};
