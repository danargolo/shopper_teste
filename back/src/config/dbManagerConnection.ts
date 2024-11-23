import mysql from 'mysql2/promise';

export const dbConfig = {
  host: process.env.DB_HOST ?? 'db',
  user: process.env.DB_USER ?? 'root',
  password: process.env.DB_PASSWORD ?? 'root_password',
  database: process.env.DB_NAME ?? 'travels_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0, 
};

const pool = mysql.createPool(dbConfig);

export const getConnection = async (): Promise<mysql.PoolConnection> => {
  try {
    const connection = await pool.getConnection();
    console.log('Conexão obtida do pool com sucesso!');
    return connection;
  } catch (error) {
    console.error('Erro ao obter conexão do pool:', error);
    throw error;
  }
};

export const closeConnection = async (): Promise<void> => {
  try {
    await pool.end();
    console.log('Pool de conexões encerrado.');
  } catch (error) {
    console.error('Erro ao encerrar o pool de conexões:', error);
    throw error;
  }
};