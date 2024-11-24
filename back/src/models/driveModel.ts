import { getConnection } from "../config/dbManagerConnection.ts";
import * as mysql from 'mysql2/promise';
import { formatDrivers } from "../utils/formatDriver.ts";
import * as interf from "../interfaces/interfaces.ts";

export interface Driver extends mysql.RowDataPacket {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  rate: number;
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

  const formattedDrivers = formatDrivers(rows as interf.RawDriver[]);

  return formattedDrivers;
    
  } catch (error) {
    console.log(error)
    return null
  }
};

export const getDriverByID = async (id: number) => {
  const query = `SELECT 
  * 
  FROM drivers d
  JOIN 
    reviews r ON d.id = r.driver_id
  WHERE d.id = ?;`;

  const connection = await getConnection();
  const [rows]: [Driver[], mysql.FieldPacket[]] = await connection.execute(query, [id]); 
  return rows[0];
}
