import axios from "axios";
import polyline from "@mapbox/polyline";
import { CustomError } from "../utils/customError.ts";

function formatCoordinates(coordinates: number[][]): string {
  return coordinates
    .map(([lat, lng]) => `|${lat},${lng}`)
    .join('');
}

export const mapStaticAPI = async ( routeResponse:any, encoded:any ): Promise< any > => {
  try {
    const { 
      startLocation: { latLng: { latitude: startLat, longitude: startLng } },
      endLocation: { latLng: { latitude: endLat, longitude: endLng } } 
    } = routeResponse;
  
    const decoded = polyline.decode(encoded.encodedPolyline);
  
    const coordinates = formatCoordinates(decoded);
    
    const config = {
      origin_marker:`color:blue|label:O|${startLat}, ${startLng}`, 
      destination_marker:`color:red|label:D|${endLat}, ${endLng}`, 
      zoom: 14,
      size: '1080x418',
      weight: 4,
      color: "blue"  
    }
    
    const apiKey = process.env.GOOGLE_API_KEY; 
    const url = `https://maps.googleapis.com/maps/api/staticmap?
        size=${config.size}&
        markers=${config.origin_marker}&
        markers=${config.destination_marker}&
        path=color:${config.color}|
        weight:${config.weight}
        ${coordinates}&
        key=${apiKey}`.replace(/\s+/g, '');
  
  
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const base64 = Buffer.from(response.data, 'binary').toString('base64');

    const dataBase64 = `data:image/png;base64,${base64}`;
    console.log('gerou base64 map');
    
    await postMapStaticApi(dataBase64, startLat);

    
  } catch (error: any) {
    throw CustomError(error.response.statusText,error.response.status, error.code )
    
  }

} 

const postMapStaticApi = async (dataBase64: any, startLat: string): Promise<any> => {
  
  const baseURL =`http://localhost:8080/map/saveStaticMap/${startLat}`;
  await axios.post(baseURL, {dataBase64});

}
