import React, { ChangeEvent, useState } from "react";
import "./styles.css";
import { useRenderContext } from "../../context/renderContext";
import { apiRequest } from "../../services/apiRequest";

interface FormDataInterface {
  customer_id: string;
  origin: string;
  destination: string;
}

export const TravelForms = (): React.JSX.Element => {
  const { setCurrentRender, setIsLoading, setDataResponse } = useRenderContext();
  const [formData, setFormData] = useState<FormDataInterface>({
    customer_id: "",
    origin: "",
    destination: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();    
    setIsLoading({signal:true, message:"Buscando motoristas..."}); 

    const response = await apiRequest(
      "/ride/estimate",
      "POST",
      formData
    )

    setDataResponse({
      customer_id: formData.customer_id,
      input_origin: formData.origin,
      input_destination: formData.destination,
      ...response.data,
    })

    setIsLoading({signal:false}); 
    setCurrentRender('options')
    
  }

  return (
    <div className="form-travel-container">
      <h2 className="tittle">Travel Request</h2>
      <form>
        <div>
          <label htmlFor="customer_id">ID Usuário</label>
          <input
            type="text"
            id="customer_id"
            name="customer_id"
            value={formData.customer_id}
            onChange={handleInputChange}
            className="input-travel"
            required
            aria-label="User ID"
          />
        </div>
        <div>
          <label htmlFor="origin">Endereço de Origem</label>
          <input
            type="text"
            id="origin"
            name="origin"
            value={formData.origin}
            onChange={handleInputChange}
            className="input-travel"
            required
            aria-label="Origin Address"
          />
        </div>
        <div>
          <label htmlFor="destination">Endereço de Destino</label>
          <input
            type="text"
            id="destination"
            name="destination"
            value={formData.destination}
            onChange={handleInputChange}
            className="input-travel"
            required
            aria-label="Destination Address"
          />
        </div>
        <button
          type="submit"
          className="formTravelBtn"
          onClick={(e) => { handleClick(e)}}
          aria-label="Estimate Travel Cost"
        >
          Estimar Valor da Viagem
        </button>
      </form>
    </div>
  );
};
