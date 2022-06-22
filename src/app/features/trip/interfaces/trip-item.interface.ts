import * as mapboxgl from 'mapbox-gl';

export interface TripItem {
  marker: mapboxgl.Marker;
  name: string;
  imageUrl?: string;
}
