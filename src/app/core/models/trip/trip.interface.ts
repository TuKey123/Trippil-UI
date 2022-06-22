export interface Trip {
  id: number;
  name: string;
  location: string;
  image?: string;
  collaborators?: number[];
  album?: number;
}
