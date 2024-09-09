// -- layout para as paginas dashboard somente - header
// -- por ser um layout op proprio next manda dentro um children

import Header from "./components/header";

export default function DashboardLayout({children}: {children: React.ReactNode}){
  return(
    <>
      <Header/>
      {children}    
    </>
  )
}

// -- children - onde a pagina é renderizada