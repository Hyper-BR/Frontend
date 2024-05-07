import { ArtistDTO } from '../artist/types';

export type CustomerDTO = {
  id: number;
  name: string;
  email: string;
  password?: string;
  country: string;
  birthDate: string;
  subscription: number;
  avatar: string;
  artistProfiles: ArtistDTO[];
};

export type LoginDTO = {
  customer: CustomerDTO;
  token: TokenDTO;
};

export type TokenDTO = {
  token: string;
};
