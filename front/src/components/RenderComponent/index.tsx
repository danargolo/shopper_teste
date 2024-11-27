import { useRenderContext } from "../../context/renderContext"
import { Loader } from "../Loader";
import { TravelForms } from "../TravelForms";
import { TravelHistory } from "../TravelHistory";
import { TravelOptions } from "../TravelOptions";


const objectMapComponents: { [key: string]: JSX.Element } = {
  forms: <TravelForms />,
  options: <TravelOptions />,
  history: <TravelHistory />
}

export const RenderComponent = () => {
  const { currentRender, isLoading } = useRenderContext();

  return (
    isLoading.signal ? <Loader /> : objectMapComponents[currentRender]
  )
}