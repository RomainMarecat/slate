export class Map {
  key: string;
  name: string;
  published: boolean;
  published_at: Date;
}

export interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
