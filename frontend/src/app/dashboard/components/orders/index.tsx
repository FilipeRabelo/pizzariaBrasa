"use client"

import { use }          from "react";
import { OrderContext } from "@/providers/order";
import { RefreshCw }    from "lucide-react";
import { OrderProps }   from "@/lib/order.type";
import { ModalOrder }   from "@/app/dashboard/components/modal";
import { useRouter }    from "next/navigation"
import { toast }        from "sonner";
import styles           from "./styles.module.scss";

interface Props{
  orders: OrderProps[];
}

export default function Orders({orders}: Props) {

  const { isOpen, onRequestOpen } = use(OrderContext);  {/* use pega o contexto do providers */}
  const router                    = useRouter();

  async function handleDetailOrder(order_id: string){
    await onRequestOpen(order_id)
  }

  function hendleRefresh(){
    router.refresh();
    toast.success("Pedidos atualizados com sucesso")
  }
  
  return (
    <>    
      <main className={styles.container}>

        <section className={styles.containerHeader}>
          <h1>Últimos Pedidos</h1>
          <button onClick={hendleRefresh}>
            <RefreshCw size={24} color="#39FF14" />
          </button>
        </section>

        <section className={styles.listOrders}>

          {orders.length === 0 && (
            <span className={styles.emptyItem}>Nenhum pedido aberto no momento</span>   /* PARA ATUALIZAR A PAGINA PELO BOTÃO REFRESH */
          )}      

          {orders.map(order => (
            <button
              key={order.id}
              className={styles.orderItem}
              onClick={() => handleDetailOrder(order.id)}
            >

              <div className={styles.tag}></div>
              <div className={styles.span}> 
                <span >Mesa :  {order.table}</span>
                <span >{!order.name ? "" : order.name}</span>
              </div>
              
            </button>

          ))}
        </section>

      </main>
    
      { isOpen && <ModalOrder/> }  {/* se isOpen for true abre o ModalOrder */}

      {/* isOpen vem la do contexto do providers */}
            
    </>
  )
}