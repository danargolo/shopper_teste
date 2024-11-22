import { useRenderContext } from "../../context/renderContext"
import { TravelForms } from "../TravelForms";
import { TravelHistory } from "../TravelHistory";
import { TravelOptions } from "../TravelOptions";


const objectMapComponents: { [key: string]: JSX.Element } = {
  forms: <TravelForms />,
  options: <TravelOptions />,
  history: <TravelHistory />
}

export const RenderComponent = () => {
  const { currentRender } = useRenderContext();

  return (
    objectMapComponents[currentRender]
  )
}