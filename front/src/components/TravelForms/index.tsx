import React, { ChangeEvent, useEffect, useState } from "react";
import { useRenderContext } from "../../context/renderContext";
import { apiRequest } from "../../services/apiRequest";
import { ErrorHandler } from "../ErrorHandler";
import "./styles.css";
import { Hero } from "../Hero";

interface FormDataInterface {
  customer_id: string;
  origin: string;
  destination: string;
}

export const TravelForms = (): React.JSX.Element => {
  const {
    setCurrentRender,
    setIsLoading,
    setDataResponse,
    throwError,
    setThrowError,
  } = useRenderContext();
  const [formData, setFormData] = useState<FormDataInterface>({
    customer_id: "",
    origin: "",
    destination: "",
  });

  const [formErrors, setFormErrors] = useState<FormDataInterface>({
    customer_id: " ",
    origin: "",
    destination: "",
  });

  useEffect(() => {
    validateForm();
  }, [formData]);

  const validateForm = (): boolean => {
    const errors: any = {};
    let isValid = true;

    if (!/^\d+$/.test(formData.customer_id)) {
      errors.customer_id = "O ID deve conter apenas números.";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    validateForm();
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      setIsLoading({ signal: true, message: "Calculando rota..." });

      const response = await apiRequest("/ride/estimate", "POST", formData);

      const staticMap = await apiRequest("/map", "GET");
      
      setDataResponse({
        customer_id: formData.customer_id,
        input_origin: formData.origin,
        input_destination: formData.destination,
        ...response.data,
        staticMap
      });
     

      setIsLoading({ signal: false });
      setCurrentRender("options");
    } catch (error: any) {
      setIsLoading({ signal: false });

      const errorMessage = error.response.data.error_description;
      setThrowError(errorMessage);
    }
  };

  return (
    <>
      <Hero />
      <section id="travel-forms">
      <div id="form-travel-container">
        <h2 className="tittle">Solicite sua viagem</h2>
        <form>
          <div>
            <label id="label-forms" htmlFor="customer_id">ID Usuário</label>
            <input
              type="text"
              id="customer_id"
              name="customer_id"
              value={formData.customer_id}
              onChange={(e) => handleInputChange(e)}
              className={`input-travel ${
                formErrors.customer_id && formData.customer_id.trim() !== ""
                  ? "input-error"
                  : ""
              }`}
              required
              aria-label="User ID"
            />
            <div
              className={
                formErrors.customer_id && formData.customer_id.trim() !== ""
                  ? "error-visible"
                  : "error-hide"
              }
            >
              <p>{formErrors.customer_id}</p>
            </div>
          </div>
          <div>
            <label id="label-forms" htmlFor="origin">Endereço de Origem</label>
            <input
              type="text"
              id="origin"
              name="origin"
              value={formData.origin}
              onChange={handleInputChange}
              className={`input-travel ${
                formErrors.origin ? "input-error" : ""
              }`}
              required
              aria-label="Origin Address"
            />
            {formErrors.origin && (
              <p className="error-text">{formErrors.origin}</p>
            )}
          </div>
          <div>
            <label id="label-forms" htmlFor="destination">Endereço de Destino</label>
            <input
              type="text"
              id="destination"
              name="destination"
              value={formData.destination}
              onChange={handleInputChange}
              className={`input-travel ${
                formErrors.destination ? "input-error" : ""
              }`}
              required
              aria-label="Destination Address"
            />
            {formErrors.destination && (
              <p className="error-text">{formErrors.destination}</p>
            )}
          </div>
          <button
            type="submit"
            id="btn-estimate"
            onClick={(e) => {
              handleClick(e);
            }}
            aria-label="Estimate Travel Cost"
          >
            Estimar Valor da Viagem
          </button>
        </form>
      </div>
      </section>
      {throwError && <ErrorHandler />}
    </>
  );
};
