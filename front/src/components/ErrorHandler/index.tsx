import { useEffect } from "react";
import { useRenderContext } from "../../context/renderContext";
import "./styles.css";

export const ErrorHandler = (): React.JSX.Element => {
  const {  setIsLoading, throwError, setThrowError } =  useRenderContext();
  
  useEffect(() => {
    setIsLoading({signal: false})
  }, [throwError])
  
  return (
    <div className="error-handler-overlay">
      <div className="error-handler-container">
        <h3>Ocorreu um erro</h3>
        <p>{throwError}</p>
        <button className="close-btn" onClick={() => setThrowError("")}>
          Fechar
        </button>
      </div>
    </div>
  );
};
