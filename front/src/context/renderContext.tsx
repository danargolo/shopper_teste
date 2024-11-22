import { createContext, ReactNode, useContext, useMemo, useState } from "react";

interface RenderContextInterface {
  currentRender: string;
  setCurrentRender: (value: string) => void;
  isLoading: boolean; 
  setIsLoading: (value: boolean) => void;
}

const RenderContext = createContext<RenderContextInterface | undefined>(undefined);

export const RenderProvider = ({children}: { children: ReactNode }) => {
  const [ currentRender, setCurrentRender ] = useState('forms');
  const [ isLoading, setIsLoading ] = useState(false);

  const contextValue  = useMemo(() => {
    return {
      currentRender, setCurrentRender, isLoading, setIsLoading
    };
  }, [currentRender, setCurrentRender, isLoading, setIsLoading]);

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
