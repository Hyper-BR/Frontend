import { ArtistDTO } from '../artist/types';

export type CustomerDTO = {
  id: number;
  name: string;
  email: string;
  password?: string;
  country: string;
  birthDate: string;
  subscription: number;
  avatarUrl: string;
  artistProfile: ArtistDTO[];
};

export type LoginDTO = {
  customer: CustomerDTO;
  token: TokenDTO;
};

export type LoginCredentialsDTO = {
  email: string;
  password: string;
};

export type TokenDTO = {
  token: string;
};
