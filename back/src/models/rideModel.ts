import { getConnection } from "../config/dbManagerConnection.ts";
import * as mysql from 'mysql2/promise';
import * as interf from "../interfaces/interfaces.ts";
import { CustomError } from "../utils/customError.ts";

export const saveRideModel = async (data: interf.RideHistoryInterface) => {
  try {
    const connection = await getConnection();

    const query = `
      INSERT INTO rides (customer_id, origin, destination, distance, duration, driver_id, value)
      VALUES (?, ?, ?, ?, ?, ?, ?);
    `;

    const params = [
      data.customer_id,
      data.origin,
      data.destination,
      data.distance,
      data.duration,
      data.driver.id,
      data.value,
    ];

    await connection.query(query, params);

    connection.release()

    return console.log('Viagem adicionada com sucesso!')
    
  } catch (error: any) {
      throw CustomError(error.sqlMessage, 500, error.code )
  }

}

export const getRideHistory = async (customer_id: string, driver_id?: string) => {
  const query = `
    SELECT * FROM rides
    WHERE customer_id = ?
    ${driver_id ? "AND driver_id = ?" : ""}
    ORDER BY created_at DESC
  `;

  const values = driver_id ? [customer_id, driver_id] : [customer_id];
  const connection = await getConnection();
  const [rows]: [mysql.RowDataPacket[], mysql.FieldPacket[]] = await connection.execute(query, values);

  return rows;
};
