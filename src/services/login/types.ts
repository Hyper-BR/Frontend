import { ArtistDTO } from '../artist/types';
import { CustomerDTO } from '../customer/types';

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
