import { getConnection, closeConnection } from "../config/dbManagerConnection.ts";
import { Drivers } from './seedData.ts';
import { DriversInterface } from '../interfaces/interfaces.ts';

const generateDriversQuery = (drivers: DriversInterface[] ) => {
  const values = drivers
    .map(
      (driver) =>
        `('${driver.name}', '${driver.description}', '${driver.vehicle}', 
      '${driver.rate}', '${driver.min_distance}')`
    )
    .join(',\n');

  const query = `
    INSERT INTO drivers (name, description, vehicle, rate, min_distance)
    VALUES ${values};
  `;
  
  return query;
};

const driversInsertQuery = generateDriversQuery(Drivers);

const seedDatabase = async () => {
  const connection = await getConnection();

  try {
    await connection.query('DELETE FROM drivers');

    await connection.query(driversInsertQuery);

    console.log('Drivers carregados com sucesso!');
  } catch (error) {
    console.error('Erro durante o seeding:', error);
  } finally {
    await closeConnection();
  }
};

seedDatabase();
