export interface FormattedDriver {
  id: number;
  name: string;
  description: string,
  vehicle: string;
  rate: number;
  rating: any; //ajustar
  comment: any; //ajustar
};

export const formatDrivers = (rows: any): FormattedDriver[] => {
  return rows.map((row: FormattedDriver) => ({
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