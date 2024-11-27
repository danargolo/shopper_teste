import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { rideRouter } from './routers/rideRouter.ts'
import { errorMiddleware } from './middlewares/errorMiddleware.ts';
import { driveRouter } from './routers/driverRoutes.ts';
import { mapRouter } from './routers/mapRoute.ts';

dotenv.config();

const port = process.env.PORT ?? 8080;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/ride', rideRouter)
app.use('/drivers', driveRouter);
app.use('/map', mapRouter);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
