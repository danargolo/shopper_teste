import * as interf from "../interfaces/interfaces.ts";

export const formatDrivers = (rows: interf.RawDriver[]): interf.FormattedDriver[] => {
  return rows.map((row: interf.RawDriver) => ({
    id: row.id,
    name: row.name,
    description: row.description,
    vehicle: row.vehicle,
    rate: row.rate,
    review: {
      rating: row.rating,
      comment: row.comment,
    }
  })
)};