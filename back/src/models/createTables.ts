import mysql from 'mysql2/promise';
import { dbConfig } from '../config/dbConfig.ts';

const createTables = async () => {
  try {
    const connection = await mysql.createConnection(dbConfig);

    const createDriversTable = `
      CREATE TABLE IF NOT EXISTS drivers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        vehicle VARCHAR(255) NOT NULL,
        value DECIMAL(10, 2) NOT NULL DEFAULT 1.00,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    const createReviewsTable = `
      CREATE TABLE IF NOT EXISTS reviews (
        id INT AUTO_INCREMENT PRIMARY KEY,
        rating INT NOT NULL,
        comment VARCHAR(255) NOT NULL,
        driver_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (driver_id) REFERENCES drivers(id)
      );
    `;

    const createRidersTable = `
      CREATE TABLE IF NOT EXISTS riders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        origin VARCHAR(255) NOT NULL,
        destination VARCHAR(255) NOT NULL,
        distance INT NOT NULL,
        duration VARCHAR(255) NOT NULL,
        value INT NOT NULL,
        driver_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (driver_id) REFERENCES drivers(id)
      );
    `;

    await connection.execute(createDriversTable);
    console.log('Tabela "drivers" criada com sucesso.');

    await connection.execute(createReviewsTable);
    console.log('Tabela "reviews" criada com sucesso.');

    await connection.execute(createRidersTable);
    console.log('Tabela "rides" criada com sucesso.');

    await connection.end();
    console.log('Conexão encerrada após criar tabelas.');
  } catch (error) {
    console.error('Erro ao criar tabelas:', error);
  }
};

// Inicializa a criação das tabelas de forma independente
const initializeDatabase = async () => {
  console.log('Iniciando a criação das tabelas...');
  await createTables();
};

initializeDatabase();
