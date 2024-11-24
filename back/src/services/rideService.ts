import { routesApi } from "../api/routesApi.ts";
import { driveModel, getDriverByID } from "../models/driveModel.ts";
import { addValueToDrivers } from "../utils/calculatDriversValues.ts";
import { CustomError } from "../utils/customError.ts";

export const confirmService = async (body: any) => {
  const { id } = body.driver;
  const driver = await getDriverByID(id);

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

export const estimateService = async (_customer_id: string, origin: string, destination: string) => {
  const route: any = await routesApi(origin, destination);  

  const { distance, duration, routeResponse, ...remainingRoute } = route; 

  const parseDistance = parseFloat((distance / 1000).toFixed(1));

  const filteredDrivers = await driveModel(parseDistance);  

  if (filteredDrivers === null || filteredDrivers.length === 0) {
    throw CustomError(
      404, 
      "Motoristas não disponiveis para rota escolhida", 
      "DRIVER_NOT_FOUND"
    )
  }

  const driverUpdated = addValueToDrivers(filteredDrivers, parseDistance);
  
  const formatedResponse = {
    ...remainingRoute,
    distance: parseDistance,
    duration,
    options: driverUpdated,
    routeResponse
  }

  return formatedResponse;
};
