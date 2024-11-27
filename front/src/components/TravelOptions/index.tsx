import './styles.css';
import { useRenderContext } from '../../context/renderContext';
import { useState } from 'react';
import { apiRequest } from '../../services/apiRequest';
import { ErrorHandler } from '../ErrorHandler';

interface DriversInterface {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  review: {
    rating: number;
    comment: string;
  };
  value: number;
}

interface RequestBodyInterface {
  customer_id: string,
  origin: string,
  destination: string,
  distance: number,
  duration: string,
  driver: {
    id: number,
    name: string
  },
  value: number
}

export const TravelOptions = (): React.JSX.Element => {
  const { setCurrentRender, setIsLoading, dataResponse, setThrowError, throwError } = useRenderContext();
  
  const { options } = dataResponse;
    
  const handleClick = async (driver: DriversInterface) => {
    try {     

      setIsLoading({signal:true});

      const rideDataConfirm = {
        customer_id: dataResponse.customer_id, 
        origin: dataResponse.input_origin,
        destination: dataResponse.input_destination,
        distance: dataResponse.distance,
        duration: dataResponse.duration,
        driver: {
          id: driver.id,
          name: driver.name,
        },
        value: driver.value,
      };  
  
      await apiRequest(
        "/ride/confirm",
        "PATCH",
        rideDataConfirm
      )    
  
      setCurrentRender('history');
      setIsLoading({signal: false})
      
    } catch ( error: any ) {
      setIsLoading({ signal: false });

      const errorMessage = error.response.data.error_description;
      setThrowError(errorMessage);
      
    }
  }

  return (
    <div className="drivers-options">
      <div className="map-container">
        <img src={dataResponse.staticMap.data} alt='Route Map Static'/>
      </div>
      <h3 className="tittle">Motoristas Disponíveis</h3>

      {(options && options.length > 0) ? (
        options.map((driver: DriversInterface) => (
          <div key={driver.id + driver.value} className="driver-card">
            <div className="container-data">
              <h4 className="card-name">{driver.name}</h4>
              <p className="card-description">{driver.description}</p>
              <div className="card-vehicle">
                <span className="card-text">{driver.vehicle}</span>
              </div>
              <div className="card-review">
                <span className="card-text">{driver.review.rating}</span>
                <span className="card-text">{driver.review.comment}</span>
              </div>
            </div>
            <div className="container-value">
              <p className="card-value">{driver.value}</p>
              <button 
                className="card-btn"
                onClick={ () => handleClick(driver) }
              >
                  Escolher
              </button>
            </div>
          </div>
        ))
      ): 
      (<p>Sem motoristas disponiveis no momento.</p>)}
      {throwError && <ErrorHandler />}
    </div>
  );
};
