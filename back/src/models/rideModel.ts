import { getConnection } from "../config/dbManagerConnection.ts";
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

    return console.log('Viagem adicionada com sucesso!')
    
  } catch (error: any) {
      throw CustomError(error.sqlMessage, 500, error.code )
  }

}