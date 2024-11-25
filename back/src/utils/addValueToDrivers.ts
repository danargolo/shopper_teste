import * as inter from "../interfaces/interfaces.ts";

export const addValueToDrivers = (drivers: inter.FormattedDriver[], distance: number) => {
  
  if (!drivers) {
    return
  }
  const driverWithValue =  drivers.map(({ rate, ...driver }) => {

    const value = distance * parseFloat(rate);

    return {
      ...driver,
      value
    };
  });

  return driverWithValue;  
};