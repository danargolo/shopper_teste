import "./App.css";
import { Header } from "./components/Header";
import { RenderComponent } from "./components/RenderComponent";
import { Loader } from "./components/Loader";
import { Footer } from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <div id="container-component">
        <RenderComponent />
      </div>
      <Footer />
      {/* <Routes>
        <Route path="/" element={<TravelForms />} />
        <Route path="/travel" element={<TravelOptions />} />
        <Route path="/history" element={<TravelHistory />} />
      </Routes> */}
    </>
  );
}

export default App;
