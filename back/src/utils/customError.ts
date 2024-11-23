interface CustomErrorInterface extends Error {
  statusCode: number,
  errorCode?: string
}

export const CustomError = (statusCode: number, errorDescription: string, errorCode: string) => {
  const error = new Error(errorDescription) as CustomErrorInterface;
  error.statusCode = statusCode;
  // error.errorDescription = errorDescription;
  error.errorCode = errorCode;

  return error;
}
