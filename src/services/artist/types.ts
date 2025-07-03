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

export type ArtistDTO = {
  id: number;
  username: string;
  credits: number;
  email?: string;
  carts?: [];
};
