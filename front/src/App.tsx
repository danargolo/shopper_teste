import "./App.css";
import { Header } from "./components/Header";
import { RenderComponent } from "./components/RenderComponent";
import { Footer } from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <main id="container-component">
        <RenderComponent />
      </main>
      <Footer />
    </>
  );
}

export default App;
