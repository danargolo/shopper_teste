import express from "express";
import { validateInput } from "../middlewares/validateInput.ts";
import { rideController } from "../controllers/rideController.ts";

export const rideRouter = express.Router();

rideRouter
  .post('/estimate', validateInput, rideController)
  .patch('/confirm', (_req, res) => {
    try {
      res.status(200).json({ message: 'rota patch confirm' });
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  })
  .get('/', (_req, res) => {
    try {
      res.status(200).json({ message: 'rota ride' });
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  } )