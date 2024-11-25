import * as interf from "../interfaces/interfaces.ts";

export const formatRideResponse = (rides: any[]): any[] => {
  return rides.map((ride: any) => (
    {
      id: ride.id,
      date: ride.created_at,
      origin: ride.origin,
      destination: ride.destination,
      distance: ride.distance,
      duration: ride.duration,
      driver: {
        id: ride.driver_id,
        name: ride.driver_name 
      },
      value: ride.value
      }
  )
)
};