import "./styles.css";
import { useRenderContext } from "../../context/renderContext";
import { useState } from "react";
import { apiRequest } from "../../services/apiRequest";
import { ErrorHandler } from "../ErrorHandler";
import { formatCurrency } from "../../utils/formatCurrency";

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
  customer_id: string;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: {
    id: number;
    name: string;
  };
  value: number;
}

export const TravelOptions = (): React.JSX.Element => {
  const {
    setCurrentRender,
    setIsLoading,
    dataResponse,
    setThrowError,
    throwError,
  } = useRenderContext();

  const { options } = dataResponse;

  const handleClick = async (driver: DriversInterface) => {
    try {
      setIsLoading({ signal: true });

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

      await apiRequest("/ride/confirm", "PATCH", rideDataConfirm);

      setCurrentRender("history");
      setIsLoading({ signal: false });
    } catch (error: any) {
      setIsLoading({ signal: false });

      const errorMessage = error.response.data.error_description;
      setThrowError(errorMessage);
    }
  };

  return (
    <section id="drivers-options">
      <div className="map-container">
        <img id="map-img" src={dataResponse.staticMap.data} alt="Route Map Static" />
      </div>
        <h3 className="tittle">Motoristas Disponíveis</h3>
      <div id="drivers-container">
        <div id="cards-container">
          {options && options.length > 0 ? (
            options.map((driver: DriversInterface) => (
              <div key={driver.id + driver.value} className="driver-card">
                <div className="card-header">
                  <div>
                    <h4 className="card-name">{driver.name}</h4>
                    <span className="card-text">{driver.review.rating} / 5</span>
                  </div>
                  <p className="card-value">{formatCurrency(driver.value)}</p>
                </div>
                <div className="card-body">
                  <p className="card-description">{driver.description}</p>
                  <div className="card-vehicle">
                    <span className="card-text vehicle-text">{driver.vehicle}</span>
                  </div>
                  <div className="card-review">
                    <span className="card-text">{driver.review.comment}</span>
                  </div>
                </div>
                <div className="card-footer">
                  <button
                    className="card-btn"
                    onClick={() => handleClick(driver)}
                  >
                    Escolher
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>Sem motoristas disponiveis no momento.</p>
          )}
        </div>
      </div>
      {throwError && <ErrorHandler />}
    </section>
  );
};
