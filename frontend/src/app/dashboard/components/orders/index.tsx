"use client"

import { use }          from "react";
import { OrderContext } from "@/providers/order";
import { RefreshCw }    from "lucide-react";
import { OrderProps }   from "@/lib/order.type";
import { ModalOrder }   from "@/app/dashboard/components/modal";
import styles           from "./styles.module.scss";

interface Props{
  orders: OrderProps[];
}

export default function Orders({orders}: Props) {

  const { isOpen, onRequestOpen } = use(OrderContext);  {/* use pega o contexto do providers */}

  function handleDetailOrder(order_id: string){
    onRequestOpen(order_id)
  }
  
  return (
    <>    
      <main className={styles.container}>

        <section className={styles.containerHeader}>
          <h1>Últimos Pedidos</h1>
          <button>
            <RefreshCw size={24} color="#3fffa3" />
          </button>
        </section>

        <section className={styles.listOrders}>
          {orders.map(order => (
            <button
              key={order.id}
              className={styles.orderItem}
              onClick={() => handleDetailOrder(order.id)}
            >

              <div className={styles.tag}></div>
              <span>Mesa: {order.table}</span>
            </button>

          ))}
        </section>

      </main>
    
      { isOpen && <ModalOrder/> }  {/* se isOpen for true abre o ModalOrder */}

      {/* isOpen vem la do contexto do providers */}
            
    </>
  )
}