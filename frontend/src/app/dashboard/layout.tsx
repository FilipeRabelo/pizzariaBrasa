// -- layout para as paginas dashboard somente - header
// -- por ser um layout op proprio next manda dentro um children

import Header             from "./components/header";
import { OrderProvider }  from "@/providers/order"

export default function DashboardLayout({children}: {children: React.ReactNode}){
  return(
    <>
      <Header/>
      <OrderProvider>    
        {children} 
      </OrderProvider>       
    </>
  )
}

// -- children - onde a pagina é renderizada
// -- OrderProvider - modal da pagina dashbord 