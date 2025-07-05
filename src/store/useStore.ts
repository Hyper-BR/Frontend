import create from 'zustand';
import { TrackDTO } from '@/services/track/types';

interface useStoreProps {
  playTrack: TrackDTO;
  setPlayTrack: (data: TrackDTO) => void;
}

export const useStore = create<useStoreProps>((set) => ({
  playTrack: null,
  setPlayTrack: (data: TrackDTO) => set({ playTrack: data }),
}));
