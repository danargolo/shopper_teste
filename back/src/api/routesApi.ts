import axios from "axios";
import * as inter from "../interfaces/interfaces.ts";

export const routesApi = async (origin: string, destination: string): Promise< inter.Route | null > => {
  const apiKey = process.env.GOOGLE_API_KEY;
  const url = "https://routes.googleapis.com/directions/v2:computeRoutes"

  try {
    const headers = {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": '*',
    };

    const data = {
      computeAlternativeRoutes: false,
      origin: {
        address: origin,
      },
      destination: {
        address: destination,
      },
      travelMode: "DRIVE",
    };

    const response = await axios.post(url, data, {headers});

    const route = response.data.routes[0];
    // console.log(route.legs[0].steps);
    
    if (!route) return null;

    // console.log(route.localizedValues);
    
    // const { text } = route.localizedValues.duration
    const { distanceMeters, duration, startLocation, endLocation } = route.legs[0];

    return {
      origin: { latitude: startLocation.latLng.latitude, longitude: startLocation.latLng.longitude },
      destination: { latitude: endLocation.latLng.latitude, longitude: endLocation.latLng.longitude },
      distance: distanceMeters, 
      duration: duration,
      routeResponse: route.legs[0],
    };
  } catch (error) {
    console.error("Erro ao calcular rota", error);
    return null;
  }
};