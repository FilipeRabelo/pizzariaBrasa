
import style from "./styles.module.scss"
import { X } from "lucide-react";    // -- icone

export function ModalOrder() {
  return (
    <dialog className={style.dialogContainer}>
      <section className={style.dialogContent}>

        <button className={style.dialogBack}>
          <X size={40} color="#DC143C"/>
        </button>

        <article className={style.container}>
          <h2>Detalhes do pedido</h2>

          <span className={style.table}>
            Mesa <b>36</b>
          </span>

          <section className={style.item}>
            <span className={style.itemProduct}>1 - <b>Pizza de calabresa</b></span>
            <span className={style.description}>Pizza de calabresa com borda de catupiry gigante</span>
          </section>
          <section className={style.item}>
            <span className={style.itemProduct}>3 - <b>Pizza de mussarela</b></span>
            <span className={style.description}>Pizza de mussarela com borda de catupiry gigante</span>
          </section>

          <button className={style.buttonOrder}>
            Concluir o pedido
          </button>
        </article>

      </section>
    </dialog>
  )
}