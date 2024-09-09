import styles from "./styles.module.scss";
import { RefreshCw } from "lucide-react";
import { OrderProps } from "@/lib/order.type";

interface Props{
  orders: OrderProps[];
}

export default function Orders({orders}: Props) {
  return (
    <main className={styles.container}>

      <section className={styles.containerHeader}>

        <h1>Últimos Pedidos</h1>
        <button>
          <RefreshCw size={24} color="#3fffa3" />
        </button>

      </section>

      <section className={styles.listOrders}>
        {orders.map(orderItem => (

          <button 
            key={orderItem.id}
            className={styles.orderItem}          
          >

          <div className={styles.tag}></div>
          <span>Mesa: {orderItem.table}</span>
          
          </button>

        ))}
      </section>

    </main>
  )
}