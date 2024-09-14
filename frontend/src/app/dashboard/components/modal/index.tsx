"use client"

import style                    from "./styles.module.scss"
import { X }                    from "lucide-react";    // -- icone
import { OrderContext }         from "@/providers/order"
import { use }                  from "react";
import { calculateTotalOrder }  from "@/lib/helper";

export function ModalOrder() {

  const { onRequestClose, order, finishOrder } = use(OrderContext)


  // -- BOTAO PARA FINALIZAR O PEDIDO

  async function handleFinishOrder() {  // funcao vai ser renderiza dentro do provider
    await finishOrder(order[0].order.id)
  }

  return (
    <dialog className={style.dialogContainer}>

      <section className={style.dialogContent}>

        <div className={style.headerModal}>
          <h2>Detalhes do pedido</h2>

          <button className={style.dialogBack} onClick={onRequestClose}>
            <X size={40} color="#DC143C" />
          </button>
        </div>

        <article className={style.container}>

          <div className={style.mesa}>
            <span className={style.table}>
              Mesa: <b>{order[0].order.table}</b>
            </span>

            {order[0].order?.name && (                 // se tiver nome eu renderizo
              <span className={style.table}>
                Cliente: <b>{order[0].order.name}</b>
              </span>
            )}
          </div>

          {order.map(item => {
            const price = parseFloat(item.product.price).toFixed(2).replace('.', ',');
            const total = (parseFloat(item.product.price) * item.amount).toFixed(2).replace('.', ',');

            return (
              <section className={style.item} key={item.id}>
                <span className={style.itemProduct}>
                  <b>{item.product.name}</b>
                </span>
                <span className={style.itemValor}>Valor: R$ {price}</span>
                <span className={style.itemAmount}>
                  Quantidade: <b>{item.amount}</b> - R$ {total}
                </span>
                <span className={style.description}>
                  Descrição: {item.product.description}
                </span>
                <img
                  src={item.product.banner}
                  alt={item.product.name}
                />
              </section>
            );
          })}

          <h3 className={style.totalValue}>Valor Total do pedido: R$ {calculateTotalOrder(order)}</h3>

          <button className={style.buttonOrder} onClick={handleFinishOrder}>
            Concluir o pedido
          </button>

        </article>

      </section>

    </dialog>
  )
}



// {
//   order.map(item => (
//     <section className={style.item} key={item.id}>

//       <span className={style.itemProduct}>
//         <b>{item.product.name}</b>
//       </span>
//       <span className={style.itemValor}>Valor: R$ {item.product.price}</span>
//       <span className={style.itemAmount}>
//         Quantidade: <b>{item.amount}</b> -
//         R$ {parseFloat(item.product.price) * item.amount}
//       </span>
//       <span className={style.description}>
//         Descrição: {item.product.description}
//       </span>

//       <img
//         src={item.product.banner}
//       />

//     </section>
//   ))
// }