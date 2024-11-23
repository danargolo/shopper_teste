import * as express from 'express';

export const errorMiddleware = (
  err: Error & { errorCode?: string; errorDescription?: string; statusCode?: number },
  _req: express.Request,
  res: express.Response,
  _next: express.NextFunction
): void => {
  // console.error(err.message);

  const statusCode = err.statusCode ?? 500;
  const errorCode = err.errorCode ?? 'INTERNAL_ERROR';

  res.status(statusCode).json({
    error_code: errorCode,
    error_description: err.message ??  'Erro interno do servidor',
  });
};
