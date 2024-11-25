import axios from 'axios';

export const apiRequest = async (
  endpoint: string, 
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE', 
  data?: object, 
  params?: object, 
  headers?: object
): Promise<any> => {
  const baseURL ='http://localhost:8080';

  const config = {
    url: endpoint,
    method,
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    params,
    data,
  };

  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};
