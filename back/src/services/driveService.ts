import { getAllDrivers, postDriverModel } from "../models/driveModel.ts";
import { CustomError } from "../utils/customError.ts";

export interface DriverRegisterInterface {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  rate: string;
  min_distance: number;
}

export const getAllDriverService = async () => {
  try {
    const drivers = await getAllDrivers();

    return drivers

  } catch (error: any) {
    throw CustomError(error.message, 500, error.code);
  }

}

export const postDriverService = async (driver: DriverRegisterInterface) => {

  try {
    
    await postDriverModel(driver);

    return;
    
  } catch (error: any) {
    throw CustomError(error.message, 500, error.code);
  }

}