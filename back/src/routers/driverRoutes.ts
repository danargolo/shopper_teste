import express from "express";
import { getAllDriverController } from "../controllers/driverController.ts";


export const driveRouter = express.Router();

driveRouter
  .get("/", getAllDriverController)