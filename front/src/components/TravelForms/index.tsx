import React, { ChangeEvent, useState } from "react";

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
    <div className="containerFormTravel">
      <h2 className="tittle">Travel Request</h2>
      <form>
        <div>
          <label htmlFor="userId">User ID</label>
          <input
            type="text"
            id="userId"
            name="userId"
            value={formData.userId}
            onChange={handleInputChange}
            className="inputTravel"
            required
            aria-label="User ID"
          />
        </div>
        <div>
          <label htmlFor="origin">Origin Address</label>
          <input
            type="text"
            id="origin"
            name="origin"
            value={formData.origin}
            onChange={handleInputChange}
            className="inputTravel"
            required
            aria-label="Origin Address"
          />
        </div>
        <div>
          <label htmlFor="destination">Destination Address</label>
          <input
            type="text"
            id="destination"
            name="destination"
            value={formData.destination}
            onChange={handleInputChange}
            className="inputTravel"
            required
            aria-label="Destination Address"
          />
        </div>
        <button
          type="submit"
          className="formTravelBtn"
          aria-label="Estimate Travel Cost"
        >
          Estimate Travel Cost
        </button>
      </form>
    </div>
  );
};
