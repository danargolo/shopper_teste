import { createContext, ReactNode, useContext, useMemo, useState } from "react";

interface IsLoading {
  signal: boolean;
  message?: string;
}
interface RenderContextInterface {
  currentRender: string;
  setCurrentRender: (value: string) => void;
  isLoading: IsLoading
  setIsLoading: (value: IsLoading) => void;
  dataResponse: any;
  setDataResponse: (value: boolean) => void;
}

const RenderContext = createContext<RenderContextInterface | undefined>(undefined);

export const RenderProvider = ({children}: { children: ReactNode }) => {
  const [ currentRender, setCurrentRender ] = useState('forms');
  const [ isLoading, setIsLoading ] = useState<IsLoading>({
    signal: false, 
    message: "Carregando..."
  });
  const [ dataResponse, setDataResponse ] = useState({});

  const contextValue  = useMemo(() => {
    return {
      currentRender, setCurrentRender, isLoading, setIsLoading,
      dataResponse, setDataResponse
    };
  }, [currentRender, setCurrentRender, isLoading, setIsLoading,
      dataResponse, setDataResponse  ]);

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
