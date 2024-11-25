import './styles.css';
import { useRenderContext } from '../../context/renderContext';
import { useState } from 'react';
import { apiRequest } from '../../services/apiRequest';

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
  const { setCurrentRender, setIsLoading, dataResponse } = useRenderContext();

  const { options } = dataResponse;
    
  const handleClick = async (driver: DriversInterface) => {
    setIsLoading(true);

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

    const response = await apiRequest(
      "/ride/confirm",
      "PATCH",
      rideDataConfirm
    )

    console.log(response);

    setCurrentRender('history');
    setIsLoading(false)
  }

  return (
    <div className="drivers-options">
      <div className="map-container">
        <span className="card-text">Mapa</span>
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
    </div>
  );
};
