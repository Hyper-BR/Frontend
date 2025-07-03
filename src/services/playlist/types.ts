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
  id: number;
  name: string;
  description: string;
  image: string;
};
