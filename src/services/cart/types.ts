import { TrackDTO } from '../track/types';

export type CartDTO = {
  id?: string;
  name: string;
  tracks?: TrackDTO[];
};
