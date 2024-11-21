import './styles.css'


interface HistoryInterface {
  id: number;
  date: string; /* Date - no db */
  name: string;
  origin: string;
  destination: string;
  distance: number;
  duration: string; /* API Google */
  value: number;
}

const mockHistory: HistoryInterface[] = [
  {
    id: 1,
    date: "2024-01-15 14:30",
    name: "John Smith",
    origin: "123 Main St",
    destination: "456 Oak Ave",
    distance: 12,
    duration: "25 mins",
    value: 35.50
  },
  {
    id: 2,
    date: "2024-01-14 09:15",
    name: "Sarah Johnson",
    origin: "789 Pine Rd",
    destination: "321 Elm St",
    distance: 8,
    duration: "18 mins",
    value: 28.25
  }
]


export const TravelHistory = (): React.JSX.Element => {


  return (
    <div className="history-container">
      <h2 className="tittle">Histórico de Viagens</h2>
      <div className="data-container">

      <div className="inputs-container">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Busque pelo ID Usuário"
            className="history-input"
          />
        </div>
        <div className="flex-1">
          <select className="history-input">
            <option value="">Todos os motoristas</option>
            {/* map com drivers enviando nome para option */}
          </select>
        </div>
        <button className="history-btn">
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
            {mockHistory.map((trip) => (
              <tr key={trip.id} className="tb-row">
                <td className="data-table">{trip.date}</td>
                <td className="data-table">{trip.name}</td>
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
            ))}
          </tbody>
        </table>
      </div>
    </div>

    </div>
  );
};
