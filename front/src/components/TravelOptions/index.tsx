import './styles.css';

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

const mockDrivers: DriversInterface[] = [
  {
    id: 1,
    name: "Homer Simpson",
    description: "Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).",
    vehicle: "Plymouth Valiant 1973 rosa e enferrujado",
    review: {
      rating: 2,
      comment: "Motorista simpático,mas errou o caminho 3vezes. O carro cheira a donuts."
    },
    value: 35.50
  },
  {
    id: 2,
    name: "Dominic Toretto",
    description: "Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.",
    vehicle: "Dodge Charger R/T 1970 modificado",
    review: {
      rating: 4,
      comment: "Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!"
    },
    value: 35.50
  },
  {
    id: 3,
    name: "James Bond",
    description: "Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.",
    vehicle: "Aston Martin DB5 clássico",
    review: {
      rating: 5,
      comment: "Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto."
    },
    value: 35.50
  },
  {
    id: 1,
    name: "John Smith",
    description: "Experienced driver with 5+ years",
    vehicle: "Toyota Camry - ABC123",
    review: {
      rating: 1,
      comment: "Motorista simpático,mas errou o caminho 20vezes."
    },
    value: 15.50
  }
];

export const TravelOptions = (): React.JSX.Element => {

  return (
    <div className="drivers-options">
      <div className="map-container">
        <span className="card-text">Mapa</span>
      </div>
      <h3 className="tittle">Motoristas Disponíveis</h3>

      {(mockDrivers && mockDrivers.length > 0) ? (
        mockDrivers.map((driver) => (
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
              <button className="card-btn">Escolher</button>
            </div>
          </div>
        ))
      ): 
      (<p>Sem motoristas disponiveis no momento.</p>)}
    </div>
  );
};
