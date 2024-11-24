import express from "express";
import { validateInput } from "../middlewares/validateInput.ts";
import { confirmController, estimateController } from "../controllers/rideController.ts";

export const rideRouter = express.Router();

rideRouter
  .post('/estimate', validateInput, estimateController)
  .patch('/confirm', validateInput, confirmController)
  .get('/', (_req, res) => {
    try {
      res.status(200).json({ message: 'rota ride' });
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  } )