import { ArtistDTO } from '../artist/types';
import { TrackDTO } from '../track/types';

export type InsightsDTO = {
  totalPlays: number;
  totalPurchases: number;
  totalDownloads: number;
  totalRevenue: number;
  totalTracks: number;
  totalAlbums: number;
  tracks: TrackDTO[];
  topListeners: ArtistDTO[];
};
