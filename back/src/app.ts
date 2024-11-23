import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/teste', (_req, res) => {
  res.send('criada conexao com mysql2');}) 

export default app;