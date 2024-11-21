import React, { ChangeEvent, useState } from "react";
import "./styles.css";

interface FormDataInterface {
  userId: string;
  origin: string;
  destination: string;
}

export const TravelForms = (): React.JSX.Element => {
  const [formData, setFormData] = useState<FormDataInterface>({
    userId: "",
    origin: "",
    destination: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="form-travel-container">
      <h2 className="tittle">Travel Request</h2>
      <form>
        <div>
          <label htmlFor="userId">ID Usuário</label>
          <input
            type="text"
            id="userId"
            name="userId"
            value={formData.userId}
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
          aria-label="Estimate Travel Cost"
        >
          Estimar Valor da Viagem
        </button>
      </form>
    </div>
  );
};
