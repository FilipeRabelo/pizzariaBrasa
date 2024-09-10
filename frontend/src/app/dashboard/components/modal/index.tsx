"use client"

import style from "./styles.module.scss"
import { X } from "lucide-react";    // -- icone
import { OrderContext } from "@/providers/order"
import { use } from "react"

export function ModalOrder() {
  const { onRequestClose, order } = use(OrderContext)

  return (
    <dialog className={style.dialogContainer}>

      <section className={style.dialogContent}>
        <button className={style.dialogBack} onClick={onRequestClose}>
          <X size={40} color="#DC143C" />
        </button>

        <article className={style.container}>
          <h2>Detalhes do pedido</h2>

          <span className={style.table}>
            Mesa: <b>{order[0].order.table}</b>
          </span>
    
          {order[0].order?.name && (                 // se tiver nome eu renderizo
            <span className={style.name}>
              Cliente: <b>{order[0].order.name}</b>
            </span>
          )}

          {order.map(item => (
            <section className={style.item} key={item.id}>
              <span className={style.itemProduct}>
                <b>{item.product.name}</b>   
              </span>
              <span className={style.itemAmount}>
                Quantidade: <b>{item.amount}</b>
              </span>
              <span className={style.description}>
                Descrição: {item.product.description}
              </span>
            </section>
          ))}

          <button className={style.buttonOrder}>
            Concluir o pedido
          </button>

        </article>

      </section>

    </dialog>
  )
}