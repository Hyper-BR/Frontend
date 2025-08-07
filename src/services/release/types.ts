import { TrackDTO } from '../track/types';

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
  id?: string;
  title?: string;
  coverUrl?: string;
  type?: string;
  totalPlays?: number;
  totalPurchases?: number;
  totalDownloads?: number;
  totalRevenue?: number;
  description: string;
  cover: File;
  tracks: TrackDTO[];
};
