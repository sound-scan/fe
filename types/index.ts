export interface Review {
  soundLevel: number;
  rating: number;
  comment: string;
}

export interface Place {
  id: number;
  name: string;
  lat: number;
  lng: number;
  soundLevel: number;
  reviews: Review[];
}

export interface Measurement {
  placeId?: number;
  soundLevel: number;
  timestamp: number;
}
