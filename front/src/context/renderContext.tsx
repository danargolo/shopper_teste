import { createContext, ReactNode, useContext, useMemo, useState } from "react";

const RenderContext = createContext({});

export const RenderProvider = ({children}: { children: ReactNode }) => {
  const [ currentRender, setCurrentRender ] = useState('forms');

  const contextValue  = useMemo(() => {
    return {
      currentRender, setCurrentRender
    };
  }, [currentRender, setCurrentRender]);

  return (
    <RenderContext.Provider value={contextValue}>
      { children }
    </RenderContext.Provider>
  )
}

export const useRenderContext = () => {
  const context = useContext(RenderContext);

  if(!context) {
    throw new Error('useRender need a context')
  }
  return context;
}
