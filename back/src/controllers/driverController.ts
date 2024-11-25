import * as express from "express";
import { getAllDriverService } from "../services/driveService.ts";

export const getAllDriverController = async ( _req: express.Request, res: express.Response, next: express.NextFunction ) => {
  try {
  
    const response = await getAllDriverService();
  
    res.status(200).json(response)
  
    
  } catch (error) {
    next(error)
  }
}