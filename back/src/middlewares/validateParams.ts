import * as express from 'express';
import { CustomError } from '../utils/customError.ts';

export const validateParams = (req: express.Request, _res: express.Response, next: express.NextFunction) => {
  try {
    const { customer_id } = req.params;
    
    
    const { driver_id } = req.query;

    if (customer_id === null || !customer_id || typeof customer_id !== 'string' || customer_id.trim() === '') {
      throw CustomError(
        'Os dados fornecidos no corpo da requisição são inválidos',
        400, 
        'INVALID_DATA',
      );
    }
    
    if (driver_id && (typeof driver_id !== 'string' || driver_id.trim() === '')) {
      throw CustomError(
        'Os dados fornecidos no corpo da requisição são inválidos',
        400, 
        'INVALID_DATA'
      )
    }
    
    next();
    
  } catch (error) {
    next(error);
  }
};

