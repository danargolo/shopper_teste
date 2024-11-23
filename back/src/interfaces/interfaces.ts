export interface DriversInterface {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  value: number;
}


export interface ReviewsInterface {
  rating: number,
  comment: string
  driver_id: number
}