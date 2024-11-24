import * as express from "express"; //ajustar config typescript
import { confirmService, estimateService } from "../services/rideService.ts";


export const estimateController = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const { customer_id, origin, destination } = req.body;

    const response = await estimateService(customer_id, origin, destination)

    res.status(200).json(response);
    
  } catch (error) {
    next(error)
  }

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