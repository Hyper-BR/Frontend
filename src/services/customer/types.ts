import { ArtistDTO } from '../artist/types';

export type CustomerDTO = {
  id?: string;
  name: string;
  email: string;
  password?: string;
  country: string;
  birthDate: string;
  subscription?: number;
  avatarUrl?: string;
  bio?: string;
  artistProfile?: ArtistDTO;
};
