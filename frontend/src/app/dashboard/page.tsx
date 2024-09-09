// -- PAGINA PRINCIPAL DASHBOARD

// -- USER SERVER - SERVIDOR

import Orders from "./components/orders";
import { api } from "@/services/api";
import { getCookieServer } from "@/lib/cookieServer"
import { OrderProps } from "@/lib/order.type"

// -- buscas os dados no servidor
async function getOrders(): Promise<OrderProps[] | [] > {  // -- funcao para fazer uma requisição HTTP para buscar os pedidos via server

  try {
    const token = getCookieServer();
    const response = await api.get("/orders", {
      headers: {
        Authorization: `Bearer, ${token}`
      }
    });

    return response.data || [];   // -- retorna os dados ou um array vazio  

  }catch (err) {
    console.log(err)
    return [];
  }
}

export default async function Dashboard() {

  const orders = await getOrders();
  // console.log(orders);

  return (
    <>
      <Orders 
        orders={orders}
      />
    </>
  )
}