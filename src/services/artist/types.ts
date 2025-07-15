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
  id: string;
  avatarUrl?: string;
  username: string;
  email?: string;
  carts?: [];
};
