import express from "express";
import { getStaticMapController, saveStaticMapController } from "../controllers/mapController.ts";


export const mapRouter = express.Router();

mapRouter
  .post("/saveStaticMap/:id", saveStaticMapController)
  .get("/", getStaticMapController)