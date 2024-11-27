import express from "express";
import { validateInput } from "../middlewares/validateInput.ts";
import { validateParams } from "../middlewares/validateParams.ts";
import { 
  confirmController, 
  estimateController, 
  rideHistoryController } from "../controllers/rideController.ts";

export const rideRouter = express.Router();

rideRouter
  .post('/estimate', validateInput, estimateController)
  .patch('/confirm', validateInput, confirmController)
  .get('/:customer_id', validateParams, rideHistoryController)