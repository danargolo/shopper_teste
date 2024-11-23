export interface FormattedDriver {
  id: number;
  name: string;
  description: string,
  vehicle: string;
  rating: any;
  comment: any;
  value: number;
}

export const formatDrivers = (rows: any): FormattedDriver[] => {
  return rows.map((row: FormattedDriver) => ({
    id: row.id,
    name: row.name,
    description: row.description,
    vehicle: row.vehicle,
    review: {
      rating: row.rating,
      comment: row.comment,
    },
    value: row.value,
  })
)};