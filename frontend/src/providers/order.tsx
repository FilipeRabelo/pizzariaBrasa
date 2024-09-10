"use client"

// -- MODAL -- //

import {createContext, ReactNode, useState} from "react";

// -- void = nao retorna nada

type OrderContextData = {
  isOpen: boolean;
  onRequestOpen: () => void;    // -- para chamar para abrir o modal 
  onRequestClose: () => void;    // -- para fechar o modal
}

type OrderProviderProps = {
  children: ReactNode;
}

export const OrderContext = createContext({} as OrderContextData);

export function OrderProvider({ children }: OrderProviderProps){  // -- componente q vai ser renderizado
  
  const [isOpen, setIsOpen] = useState(false);  // se ta false ele nao abre o modal

  function onRequestOpen(){
    setIsOpen(true)
  }

  function onRequestClose(){
    setIsOpen(false)
  }
  
  return(
    <OrderContext.Provider 
      value={{ 
        isOpen,
        onRequestOpen,
        onRequestClose
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}