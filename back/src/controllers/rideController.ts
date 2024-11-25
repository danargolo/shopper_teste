import * as express from "express"; //ajustar config typescript
import { confirmService, estimateService, rideHistoryService } from "../services/rideService.ts";
import { CustomError } from "../utils/customError.ts";


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

export const rideHistoryController  = async ( req: express.Request, res: express.Response, next: express.NextFunction )=> {
try {
  const { customer_id } = req.params;
  const { driver_id } = req.query;

  const response = await rideHistoryService( customer_id, driver_id as string);

  res.status(200).json(response)

  
} catch (error) {
  next(error)
}



}