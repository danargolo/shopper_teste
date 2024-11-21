import './styles.css'

export const Header = (): React.JSX.Element => (
  <header>
    <div className="header-container">
      <div className="tittle-container">
        <h1 className="tittle-header">Travel Request System</h1>
      </div>
      <nav>
        <ul className="flex space-x-6">
          <li><a href="/" className="hover:text-blue-200">Home</a></li>
          <li>Services</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </nav>
    </div>
  </header>
);