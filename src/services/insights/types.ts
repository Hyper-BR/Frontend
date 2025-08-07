import { ArtistDTO } from '../artist/types';
import { ReleaseDTO } from '../release/types';

export type InsightsDTO = {
  totalPlays: number;
  totalPurchases: number;
  totalDownloads: number;
  totalRevenue: number;
  totalTracks: number;
  totalAlbums: number;
  releases: ReleaseDTO[];
  topListeners: ArtistDTO[];
};
