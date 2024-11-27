import './styles.css'

export const Header = (): React.JSX.Element => (
  <header>
    <div className="header-container">
      <div className="tittle-container">
        <h1 className="tittle-header">Viagem Fácil</h1>
      </div>
      <div id='register'>
        <p>É motorista?</p>
        <button id='btn-register'> Cadastre-se AQUI</button>
      </div>
      <nav>
        <ul className="flex space-x-6">
          <li><a href="/" className="hover:text-blue-200">Home</a></li>
          <li>Histórico</li>
        </ul>
      </nav>
    </div>
  </header>
);