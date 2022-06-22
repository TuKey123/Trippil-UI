import { Trip } from '../trip';

export interface Album {
  id: number;
  name: string;
  images: string[];
  trips?: Trip[];
}
