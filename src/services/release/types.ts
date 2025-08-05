import { TrackDTO } from '../track/types';

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
