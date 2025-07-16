import { TrackDTO } from '../track/types';

export type ReleaseDTO = {
  id?: string;
  type?: string;
  description: string;
  cover: File;
  tracks: TrackDTO[];
};
