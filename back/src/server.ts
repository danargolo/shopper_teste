// import 'dotenv/config';  // Carrega variáveis de ambiente do arquivo .env
import app from './app.ts';
import { Sequelize } from 'sequelize'; 

const sequelize = new Sequelize({
  dialect: 'mysql',
  host:"db",
  port: 3306,
  username: "root",
  password: "root_password",
  database: "travels_db",
});


async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados foi bem-sucedida.');

    const port = process.env.PORT ?? 8080;
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  } catch (error) {
    console.error('Não foi possível conectar ao banco de dados:', error);
    process.exit(1); 
  }
}

startServer();
