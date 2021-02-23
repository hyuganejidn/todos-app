import React, { ReactNode } from "react"
import { rootStore, StoreContext } from './store'


type StoreContextProviderProps = {
  children?: ReactNode
}

export const StoreProvider: React.FC<StoreContextProviderProps> = ({ children }) => {
  return (
    <StoreContext.Provider value={rootStore}>
      {children}
    </StoreContext.Provider>
  );
}