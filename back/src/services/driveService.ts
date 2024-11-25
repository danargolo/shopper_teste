import { getAllDrivers } from "../models/driveModel.ts";
import { CustomError } from "../utils/customError.ts";

export const getAllDriverService = async () => {
  try {
    const drivers = await getAllDrivers();

    return drivers

  } catch (error: any) {
    throw CustomError(error.message, 500, error.code);
  }

}