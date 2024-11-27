import * as express from "express";
import { getStaticMapService, saveStaticMapService } from "../services/mapService.ts";

export const getStaticMapController = async ( _req: express.Request, res: express.Response, next: express.NextFunction ) => {
  try {
  
    const response = await getStaticMapService();
  
    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}

export const saveStaticMapController = async ( req: express.Request, res: express.Response, next: express.NextFunction ) => {
  try {
    const { dataBase64 } = req.body;
    
    await saveStaticMapService(dataBase64);
  
    res.status(200).json({success: true})
  } catch (error) {
    next(error)
  }
}