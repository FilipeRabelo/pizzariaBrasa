"use client"

// -- MODAL -- //

import {createContext, ReactNode, useState} from "react";
import { api }                              from "@/services/api";
import { getCookieClient }                  from "@/lib/cookieClient";
import { toast }                            from "sonner";
import { redirect, useRouter }              from "next/navigation";

export interface OrderItemProps{
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
    name: string | null;
    draft: boolean;
    status: boolean;
  }
}

// -- void = nao retorna nada

type OrderContextData = {                                // -- aqui para permitar exportar

  isOpen: boolean;
  onRequestOpen: (order_id: string) => Promise<void>;    // -- para chamar para abrir o modal 
  onRequestClose: () => void;                            // -- para fechar o modal
  order: OrderItemProps[];
  finishOrder: (order_id: string) => Promise<void>;
}

type OrderProviderProps = {
  children: ReactNode;
}

export const OrderContext = createContext({} as OrderContextData);

export function OrderProvider({ children }: OrderProviderProps){  // -- componente q vai ser renderizado


  const [isOpen, setIsOpen] = useState(false);                    // se ta false ele nao abre o modal
  const [order, setOrder]   = useState<OrderItemProps[]>([])
  const router              = useRouter();


  // -- PARA ABRIR O MODAL

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

    setOrder(response.data);                        // -- passando os dados
    setIsOpen(true);                                // -- abrindo o modal
  }

  // -- PARA FECHAR O MODAL

  function onRequestClose(){
    setIsOpen(false);
  }


  // -- PARA FINALIZAR O PEDIDO

  async function finishOrder(order_id: string){
    const token = getCookieClient();

    const data = {
      order_id: order_id,      
    }

    try{
      await api.put("/order/finish", data, {        // -- requisição para finalizar o pedido
        headers:{
          Authorization: `Bearer ${token}`
        }
      })  
    }catch(err){
      console.log(err);
      toast.error("Falha ao finalizar esse pedido!");
      return;
    }

    toast.success("Pedido finalizado com sucesso!");
    router.refresh();
    setIsOpen(false);   

  }
  
  return(                       // -- exportando dentro do VALUE
    <OrderContext.Provider 
      value={{      
        isOpen,
        onRequestOpen,
        onRequestClose,
        finishOrder,
        order
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}