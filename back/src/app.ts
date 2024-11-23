import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { rideRouter } from './routers/rideRouter.ts'

dotenv.config();

const port = process.env.PORT ?? 8080;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/ride', rideRouter)

app.get('/teste', (_req, res) => {
  res.send('criada conexao com mysql2');}) 

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
