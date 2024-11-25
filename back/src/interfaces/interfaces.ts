export interface DriversInterface {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  rate: string;
  min_distance: number;
}

export interface FormattedDriver {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  rate: string;
  review: {
    rating: string;
    comment: string;
  };
}

export interface RawDriver {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  rate: string;
  rating: string;
  comment: string;
}


export interface ReviewsInterface {
  rating: number,
  comment: string
  driver_id: number
}

interface LatLng {
  latitude: number;
  longitude: number;
}

interface RouteLeg {
  distanceMeters: number;
  duration: string;
  startLocation: LatLng;
  endLocation: LatLng;
}

export interface Route {
  origin: LatLng;
  destination: LatLng;
  distance: number; 
  duration: string;
  routeResponse: RouteLeg;
}


export interface RideHistoryInterface {
  customer_id: string,
  origin: string,
  destination: string,
  distance: number,
  duration: string,
  driver: {
    id: number,
    name: string
  },
  value: number
}