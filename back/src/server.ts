import mysql from 'mysql2/promise';
import app from './app.ts';
import { dbConfig } from './config/dbManagerConnection.ts';

export const createConnection = async () => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('Conexão com o banco de dados testada com sucesso!');
    await connection.end();
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
};

const startServer = () => {
  const port = process.env.PORT ?? 8080;
  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });
};

const initializeApp = async () => {
  startServer();
  await createConnection();
};

initializeApp();
