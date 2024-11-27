import express from "express";
import { getAllDriverController, postDriverController } from "../controllers/driverController.ts";


export const driveRouter = express.Router();

driveRouter
  .post('/register', postDriverController)
  .get("/", getAllDriverController)