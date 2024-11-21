
import "./App.css";
import { TravelHistory } from "./components/TravelHistory";
import { TravelForms } from "./components/TravelForms";
import { TravelOptions } from "./components/TravelOptions";
import { Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<TravelForms />} />
        <Route path="/travel" element={<TravelOptions />} />
        <Route path="/history" element={<TravelHistory />} />
      </Routes>
    </>
  );
}

export default App;
