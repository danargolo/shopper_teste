import "./App.css";
import { Header } from "./components/Header";
import { RenderComponent } from "./components/RenderComponent";
import { Loader } from "./components/Loader";

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
