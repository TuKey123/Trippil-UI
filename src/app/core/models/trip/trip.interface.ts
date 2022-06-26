import * as mapboxgl from 'mapbox-gl';

export interface Trip {
  id: number;
  name: string;
  location: string;
  image?: string;
  collaborators?: number[];
  album?: number;
  startDate: Date | string | number;
  endDate: Date | string | number;
}

export interface TripDetail {
  id: number;
  name: string;
  location: string;
  description: string;
  image?: string;
  startDate: Date | string | number;
  endDate: Date | string | number;
  items: TripItem[];
  owner: {
    id: number;
  };
}

export interface TripItem {
  id: number;
  lat: number;
  lng: number;
  image?: string;
  location: string;
  startDate: Date | string | number;
  endDate: Date | string | number;
  marker?: mapboxgl.Marker;
  trip: number;
  note: any;
  description: string;
  isShared: boolean;
  isLiked?: boolean;
  numberOfLikes?: number;
}
