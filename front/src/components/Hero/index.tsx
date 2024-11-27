import './styles.css'

export const Hero = (): React.JSX.Element => (
  <section id="hero-container">
    <div id="hero-txt">
      <h1>
        A maneira mais <span className="highlight">rápida</span> e{" "}
        <span className="highlight">segura</span> de viajar.
      </h1>
    </div>
    <div id="hero-img"></div>
  </section>
);