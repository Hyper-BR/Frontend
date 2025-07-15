import { CustomerDTO } from '../customer/types';

export type ArtistPageDTO = {
  last: boolean;
  first: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  numberOfElements: number;
  page: number;
  content: ArtistDTO[];
};

export interface ArtistDTO extends CustomerDTO {
  username: string;
  isVerified: boolean;
}
