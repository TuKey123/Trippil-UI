import { environment } from 'src/environments';

export const API_URL = !!environment.apiURL
  ? `${environment.apiURL}`
  : `${window.location.origin}`;

export const APIS = {};
