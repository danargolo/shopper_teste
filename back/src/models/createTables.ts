import { closeConnection, getConnection } from '../config/dbManagerConnection.ts';

const createTables = async () => {
  try {
    const connection = await getConnection();

    const createDriversTable = `
      CREATE TABLE IF NOT EXISTS drivers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        vehicle VARCHAR(255) NOT NULL,
        rate DECIMAL(10, 2) NOT NULL DEFAULT 1.00,
        min_distance INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    const createReviewsTable = `
      CREATE TABLE IF NOT EXISTS reviews (
        id INT AUTO_INCREMENT PRIMARY KEY,
        rating INT NOT NULL,
        comment VARCHAR(255) NOT NULL,
        driver_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    const createRidesTable = `
      CREATE TABLE IF NOT EXISTS rides (
        id INT AUTO_INCREMENT PRIMARY KEY,
        customer_id INT NOT NULL,
        origin VARCHAR(255) NOT NULL,
        destination VARCHAR(255) NOT NULL,
        distance INT NOT NULL,
        duration VARCHAR(255) NOT NULL,
        driver_id INT NOT NULL,
        driver_name VARCHAR(255) NOT NULL,
        value INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (driver_id) REFERENCES drivers(id)
      );
    `;

    await connection.execute(createDriversTable);
    console.log('Tabela "drivers" criada com sucesso.');

    await connection.execute(createReviewsTable);
    console.log('Tabela "reviews" criada com sucesso.');

    await connection.execute(createRidesTable);
    console.log('Tabela "rides" criada com sucesso.');

    await closeConnection();

  } catch (error) {
    console.error('Erro ao criar tabelas:', error);
  }
};

createTables();
