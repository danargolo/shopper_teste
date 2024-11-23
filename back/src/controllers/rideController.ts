import * as express from "express";
import { driveModel } from "../models/rideModel.ts";

export const rideController = async (_req: express.Request, res: express.Response) => {
  // const { customer_id, origin, destination } = req.body;

  const response = await driveModel();

  res.status(200).json(response)

}