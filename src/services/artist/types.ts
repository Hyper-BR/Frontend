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
  username: string;
  avatarUrl?: string;
  coverUrl?: string;
  followers?: string;
  following?: string;
};
