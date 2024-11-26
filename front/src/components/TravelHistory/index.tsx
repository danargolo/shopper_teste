import { ChangeEvent, useEffect, useState } from "react";
import { apiRequest } from "../../services/apiRequest";
import "./styles.css";
import { useRenderContext } from "../../context/renderContext";

interface DriversInterface {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  rate: string;
  min_distance: number;
}

interface HistoryInterface {
  id: number;
  date: string;
  driver: {
    id: string;
    name: string;
  }
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  value: number;
};

interface HistoryInputInterface {
  historyId: string;
  selectedDriver: string
  
};

export const TravelHistory = (): React.JSX.Element => {
  const [drivers, setDrivers] = useState<DriversInterface[]>([]);
  const [dataInput, setDataInput] = useState<HistoryInputInterface>({
    historyId: "",
    selectedDriver: ""
  });
  const [ ridesHistory, setRidesHistory] = useState<HistoryInterface[]>([])
  const { setIsLoading } = useRenderContext();

  const loadDrivers = async () => {
    try {
      const response = await apiRequest("/drivers", "GET");
      setDrivers(response.data);
    } catch (error) {
      console.error("Erro ao carregar motoristas:", error);
    } finally {
      setIsLoading({ signal: false });
    }
  };

  useEffect(() => {}, [ridesHistory]);

  useEffect(() => {
    loadDrivers();
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setDataInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // setIsLoading({signal:true, message:"Buscando motoristas..."});

    const response = await apiRequest(
      `/ride/${dataInput.historyId}`,
      "GET",
      {},
      {driver_id: dataInput.selectedDriver}

    );

    const { rides } = response.data;
    console.log(rides);
    

    setRidesHistory(rides);
    // setIsLoading({signal:false});

    
  };

  return (
    <div className="history-container">
      <h2 className="tittle">Histórico de Viagens</h2>
      <div className="data-container">
        <div className="inputs-container">
          <div className="flex-1">
            <input
              type="text"
              id="historyId"
              name="historyId"
              className="history-input"
              placeholder="Busque pelo ID Usuário"
              value={dataInput.historyId}
              onChange={(e) => handleInputChange(e)}
              required
              aria-label="User ID"
            />
          </div>
          <div className="flex-1">
            <select
              name="selectedDriver"
              className="history-input"
              value={dataInput.selectedDriver}
              onChange={(e) => handleInputChange(e)}
            >
              <option value="" >Todos os motoristas</option>
              {drivers.map((driver) => (
                <option key={driver.id} value={driver.id}>
                  {driver.name}
                </option>
              ))}
            </select>
          </div>
          <button
            className="history-btn"
            onClick={(e) => {
              handleClick(e);
            }}
          >
            Buscar
          </button>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr className="th-row">
                <th>Date & Time</th>
                <th>Driver</th>
                <th>Route</th>
                <th>Distance</th>
                <th>Duration</th>
                <th>Cost</th>
              </tr>
            </thead>
            <tbody>
              { (ridesHistory && ridesHistory.length > 0) ?
                  ridesHistory.map((trip) => (
                    <tr key={trip.id} className="tb-row">
                      <td className="data-table">{trip.date}</td>
                      <td className="data-table">{trip.driver.name}</td>
                      <td>
                        <div className="address">
                          <div className="medium-bold">{trip.origin}</div>
                          <div>{trip.destination}</div>
                        </div>
                      </td>
                      <td className="data-table">{trip.distance}</td>
                      <td className="data-table">{trip.duration}</td>
                      <td className="data-table medium-bold">${trip.value}</td>
                    </tr>
                  )
                ) : 
                (<tr>Sem histórico de viagens para exibir.</tr> )
               }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
