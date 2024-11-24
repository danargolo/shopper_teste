import * as express from "express";
import { driveModel } from "../models/rideModel.ts";
import { confirmService } from "../services/rideService.ts";

export const rideController = async (_req: express.Request, res: express.Response) => {
  // const { customer_id, origin, destination } = req.body;

  const response = await driveModel();

  res.status(200).json(response);

}

export const confirmController = async ( req: express.Request, res: express.Response, next: express.NextFunction )=> {
  try {
    const body = req.body;

    const response = await confirmService(body);
  
    res.status(200).json(response);
    
  } catch (error) {
    next(error);
    
  } //ajustar o throw erro
  

}