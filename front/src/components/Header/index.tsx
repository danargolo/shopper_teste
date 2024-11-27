import './styles.css'

export const Header = (): React.JSX.Element => (
  <header>
    <div className="header-container">
      <div className="tittle-container">
      <a href="/" className="hover:text-blue-200"><h1 className="tittle-header">Viagem Fácil</h1></a>
      </div>
      <div id='register'>
        <p>É motorista?</p>
        <button id='btn-register' disabled> Cadastre-se AQUI</button>
      </div>
      <nav>
        <ul className="flex space-x-6">
          <li id='home'><a href="/" className="hover:text-blue-200">Home</a></li>
          <li className='inactive'>Sobre</li>
          <li className='inactive'>Histórico</li>
        </ul>
      </nav>
    </div>
  </header>
);