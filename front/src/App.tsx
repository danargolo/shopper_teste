import "./App.css";
import { TravelHistory } from "./components/TravelHistory";
import { TravelForms } from "./components/TravelForms";
import { TravelOptions } from "./components/TravelOptions";
import { Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { RenderComponent } from "./components/RenderComponent";

function App() {
  return (
    <>
      <Header />
      <RenderComponent />
      {/* <Routes>
        <Route path="/" element={<TravelForms />} />
        <Route path="/travel" element={<TravelOptions />} />
        <Route path="/history" element={<TravelHistory />} />
      </Routes> */}
    </>
  );
}

export default App;
