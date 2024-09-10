"use client"

// -- MODAL -- //

import {createContext, ReactNode, useState} from "react";
import { api }              from "@/services/api";
import { getCookieClient }  from "@/lib/cookieClient"

interface OrderItemProps{
  id: string;
  amount: number;
  created_at: string;
  order_id: string;
  product_id: string;
  product:{
    id: string;
    name: string;
    price: string;
    description: string;
    banner: string;
    category_id: string
  };
  order:{
    id:string;
    table: number;
    name: string;
    draft: boolean;
  }
}

// -- void = nao retorna nada

type OrderContextData = {
  isOpen: boolean;
  onRequestOpen: (order_id: string) => void;    // -- para chamar para abrir o modal 
  onRequestClose: () => void;    // -- para fechar o modal
}

type OrderProviderProps = {
  children: ReactNode;
}

export const OrderContext = createContext({} as OrderContextData);

export function OrderProvider({ children }: OrderProviderProps){  // -- componente q vai ser renderizado

  const [isOpen, setIsOpen] = useState(false);  // se ta false ele nao abre o modal
  const [order, serOrder] = useState<OrderItemProps[]>([])

  async function onRequestOpen(order_id: string){
    // console.log(order_id)

    const token = getCookieClient();

    const response = await api.get("/order/detail", {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params:{
        order_id: order_id
      }
    });

    console.log(response.data)

    setIsOpen(true);
  }

  function onRequestClose(){
    setIsOpen(false);
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