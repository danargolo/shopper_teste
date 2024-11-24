import { getDriverByID } from "../models/rideModel.ts";
import { CustomError } from "../utils/customError.ts";

export const confirmService = async (body: any) => {
  const driver = await getDriverByID(body.driver.id);

  if (!driver || driver.length === 0) {
    throw CustomError(404, "Motorista não encontrado", "DRIVER_NOT_FOUND");
  }

  if (body.distance < driver.min_distance) {
    throw CustomError(
      406,
      "Quilometragem inválida para o motorista",
      "INVALID_DISTANCE"
    );
  }

  return driver;
};
