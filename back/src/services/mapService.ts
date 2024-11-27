import { CustomError } from "../utils/customError.ts";

let storageServiceMap: any = null; 

export const getStaticMapService = async () => {
  try {
    if (!storageServiceMap) {
      throw CustomError('Mapa não encontrado.');
    };

    return storageServiceMap;
    
  } catch (error) {
    console.error(error);
  }
}

export const saveStaticMapService = async (staticMap: any) => {
  try {
    if (!staticMap) {
      throw CustomError('Mapa não gerado.');
    }
  
    storageServiceMap = staticMap;

    return;
    
  } catch (error) {
    console.error(error);
  }
};