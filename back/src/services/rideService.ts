import { mapStaticAPI } from "../api/mapStaticApi.ts";
import { routesApi } from "../api/routesApi.ts";
import * as interf from "../interfaces/interfaces.ts";
import { driveModel, getDriverByID } from "../models/driveModel.ts";
import { getRideHistory, saveRideModel } from "../models/rideModel.ts";
import { addValueToDrivers } from "../utils/addValueToDrivers.ts";
import { CustomError } from "../utils/customError.ts";
import { formatRideResponse } from "../utils/formatRideResponse.ts";

export const estimateService = async (_customer_id: string, origin: string, destination: string) => {
  const route: any = await routesApi(origin, destination);  

  const { distance, duration, routeResponse, ...remainingRoute } = route;
  

  const parseDistance = parseFloat((distance / 1000).toFixed(1));

  const filteredDrivers = await driveModel(parseDistance);  

  if (filteredDrivers === null || filteredDrivers.length === 0) {
    throw CustomError(
      "Motoristas não disponiveis para rota escolhida", 
      404, 
      "DRIVER_NOT_FOUND"
    )
  }

  const driverUpdated = addValueToDrivers(filteredDrivers, parseDistance);

  const staticMap = await mapStaticAPI(routeResponse, routeResponse.polyline);

  // console.log(staticMap);
  
  
  const formatedResponse = {
    ...remainingRoute,
    distance: parseDistance,
    duration,
    options: driverUpdated,
    routeResponse: {
      staticMap,
      ...routeResponse
    }
  }

  return formatedResponse;
};

export const confirmService = async (body: interf.RideHistoryInterface) => {
  const { id } = body.driver;
  const driver = await getDriverByID(id);

  if (!driver || driver.length === 0) {
    throw CustomError("Motorista não encontrado", 404, "DRIVER_NOT_FOUND");
  }

  if (body.distance < driver.min_distance) {
    throw CustomError(
      "Quilometragem inválida para o motorista",
      406,
      "INVALID_DISTANCE"
    );
  }

  await saveRideModel(body)

  return { success:true }
};

export const rideHistoryService = async (customer_id: string, driver_id?: string) => {
  let driver

  if (driver_id) {
    driver = await getDriverByID(driver_id);

    if (!driver || driver.length === 0) {
      throw CustomError("Motorista invalido", 400, "INVALID_DRIVER");
    }
  };

  const rideHistory = await getRideHistory(customer_id, driver_id);

  if (!rideHistory || rideHistory.length === 0) {
    throw CustomError("Nenhum registro encontrado", 404, "NO_RIDES_FOUND");
  }

  return {
    customer_id,
    rides: formatRideResponse(rideHistory),
  };
}