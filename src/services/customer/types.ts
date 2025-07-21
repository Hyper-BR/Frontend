import { ArtistDTO } from '../artist/types';
import { SubscriptionDTO } from '../subscriptions/types';

export type CustomerDTO = {
  id?: string;
  name: string;
  email: string;
  password?: string;
  country: string;
  birthDate: string;
  subscription?: SubscriptionDTO;
  avatarUrl?: string;
  avatar?: File;
  bio?: string;
  artistProfile?: ArtistDTO;
  artist?: boolean;
  label?: boolean;
  coverUrl?: string;
  cover?: File;
};
