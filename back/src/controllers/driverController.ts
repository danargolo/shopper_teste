import * as express from "express";
import { getAllDriverService, postDriverService } from "../services/driveService.ts";

export const getAllDriverController = async ( _req: express.Request, res: express.Response, next: express.NextFunction ) => {
  try {
  
    const response = await getAllDriverService();
  
    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}

export const postDriverController = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {

    // const { driver } = req.body;    
  
    await postDriverService(req.body);
    
  
    res.status(200).json({success: true})
  } catch (error) {
    next(error)
  }

}