import { getConnection } from "../config/dbManagerConnection.ts";
import { CustomError } from "../utils/customError.ts";
import { formatDrivers } from "../utils/formatDriver.ts";

export const driveModel = async () => {
  try {
    const query = `SELECT 
    d.id AS id, 
    d.name AS name,
    d.description as description, 
    d.vehicle AS vehicle,
    d.rate AS rate,
    r.rating AS rating,
    r.comment AS comment
  FROM 
    drivers d
  JOIN 
    reviews r ON d.id = r.driver_id
  WHERE 
    d.rate >= ?
  ORDER BY 
    d.rate ASC;
  `;

  const value = [1];

  const connection = await getConnection();
  const [rows] = await connection.execute(query, value);

  const formattedDrivers = formatDrivers(rows as any[]);

  return formattedDrivers;
    
  } catch (error) {
    console.log(error)
  }
};

export const getDriverByID = async (id: number) => {
  const query = `SELECT d.name, d.min_distance FROM drivers d WHERE d.id = ?;`;

  const connection = await getConnection();
  const [rows]: [any[], any] = await connection.execute(query, [id]); //fazer tipagem rows

  return rows;
}
