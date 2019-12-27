import { MeetingPoint } from './meeting-point';

export interface City {
  id: string;
  _etag?: any;
  google_id: string;
  name: string;
  slug: string;
  lat: number;
  lng: number;
  meeting_points: MeetingPoint[];
  geometry: {
    location: {
      lat: number;
      lng: number;
    }
    viewport: {
      south: number;
      west: number;
      north: number;
      east: number;
    }
  };
}
