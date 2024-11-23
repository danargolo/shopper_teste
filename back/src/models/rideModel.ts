import { getConnection } from "../config/dbManagerConnection.ts";
import { formatDrivers } from "../utils/formatDriver.ts";

export const driveModel = async () => {
  try {
    const query = `SELECT 
    d.id AS id, 
    d.name AS name,
    d.description as description, 
    d.vehicle AS vehicle,
    d.value AS value,
    r.rating AS rating,
    r.comment AS comment
  FROM 
    drivers d
  JOIN 
    reviews r ON d.id = r.driver_id
  WHERE 
    d.value >= ?
  ORDER BY 
    d.value ASC;
  `;

  const value = [1];

  const connection = await getConnection();
  const [rows, values] = await connection.execute(query, value);

  console.log(rows)
  console.log(values)

  const formattedDrivers = formatDrivers(rows as any[]);

  return formattedDrivers;
    
  } catch (error) {
    console.log(error)
  }
};
