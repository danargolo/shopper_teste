import * as express from 'express';
import { CustomError } from '../utils/customError.ts';

export const validateInput = (req: express.Request, _res: express.Response, next: express.NextFunction) => {
  try {
    const { origin, destination, customer_id, driver } = req.body;

    if (customer_id !== undefined && (customer_id === null || customer_id === '')) {
      throw CustomError(
        'Os dados fornecidos no corpo da requisição são inválidos',
        400, 
        'INVALID_DATA'
      )
    }
  
    if (origin !== undefined && origin.trim() === '') {
      throw CustomError(
        'Os dados fornecidos no corpo da requisição são inválidos',
        400, 
        'INVALID_DATA'
      ) 
    }
  
    if (destination !== undefined && destination.trim() === '') {
      throw CustomError(
        'Os dados fornecidos no corpo da requisição são inválidos',
        400, 
        'INVALID_DATA'
      )
    }
  
    if (origin !== undefined && destination !== undefined && origin.trim() === destination.trim()) {
      throw CustomError(
        'Os dados fornecidos no corpo da requisição são inválidos',
        400, 
        'INVALID_DATA'
      )
    }

    if (driver && driver.id !== undefined && (driver.id === null || driver.id === '')) {
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

