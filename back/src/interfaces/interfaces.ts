export interface DriversInterface {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  rate: number;
  min_distance: number;
}


export interface ReviewsInterface {
  rating: number,
  comment: string
  driver_id: number
}