import express from "express";

export const rideRouter = express.Router();

rideRouter
  .post('/estimate', (_req, res) => {
    try {
      res.status(200).json({ message: 'rota post estimate' });
    } catch (error) {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  } )
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