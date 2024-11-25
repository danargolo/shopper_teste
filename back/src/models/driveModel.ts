import { getConnection } from "../config/dbManagerConnection.ts";
import * as mysql from 'mysql2/promise';
import { formatDrivers } from "../utils/formatDriver.ts";
import * as interf from "../interfaces/interfaces.ts";
import { CustomError } from "../utils/customError.ts";

export interface Driver extends mysql.RowDataPacket {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  rate: string;
  min_distance: number;
  created_at: Date;
}

export const driveModel = async (distance:number): Promise<interf.FormattedDriver[] | null>  => {
  try {
    const query = `SELECT 
    d.id AS id, 
    d.name AS name,
    d.description as description, 
    d.vehicle AS vehicle,
    d.rate AS rate,
    d.min_distance AS distance,
    r.rating AS rating,
    r.comment AS comment
  FROM 
    drivers d
  JOIN 
    reviews r ON d.id = r.driver_id
  WHERE 
    d.min_distance <= ?
  ORDER BY 
    d.rate ASC;
  `;

  const value = [distance];

  const connection = await getConnection();
  const [rows]: [mysql.RowDataPacket[], mysql.FieldPacket[]] = await connection.execute(query, value);

  const formattedDrivers = formatDrivers(rows as interf.RawDriver[]); //retirar e por em service!

  connection.release();

  return formattedDrivers; 
    
  } catch (error) {
    console.log(error)
    return null
  }
};

export const getDriverByID = async (id: number | string) => {
  const query = `SELECT 
  d.*,
  r.rating, 
  r.comment
  FROM drivers d
  JOIN 
    reviews r ON d.id = r.driver_id
  WHERE d.id = ?;`;

  const connection = await getConnection();
  const [rows]: [Driver[], mysql.FieldPacket[]] = await connection.execute(query, [id]); 

  connection.release();
  return rows[0];
}
export const getAllDrivers = async () => {
  const query = `
    SELECT 
      id, 
      name, 
      description, 
      vehicle, 
      rate, 
      min_distance 
    FROM 
      drivers
    ORDER BY 
      id ASC;
  `;

  try {
    const connection = await getConnection();
    const [rows]: [mysql.RowDataPacket[], mysql.FieldPacket[]] = await connection.query(query);

    connection.release()
    return rows;

  } catch (error: any) {
    throw CustomError(error.sqlMessage, 500, error.code);
  }
}
