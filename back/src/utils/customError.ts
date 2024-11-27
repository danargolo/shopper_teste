interface CustomErrorInterface extends Error {
  statusCode?: number,
  errorCode?: string
}

export const CustomError = (errorDescription: string, statusCode?: number, errorCode?: string) => {
  const error = new Error(errorDescription) as CustomErrorInterface;
  error.statusCode = statusCode;

  error.errorCode = errorCode;

  return error;
}
