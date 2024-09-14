
import styles from "./styles.module.scss";
import { Button } from "../components/button";
import { api } from '@/services/api';
import { getCookieServer } from "@/lib/cookieServer";    // -- para trazer o cookies server
import { redirect } from "next/navigation";
import { ViewCategory } from "./components/viewCategory";

export default function Category(){

  async function hendleRegisterCategory(formData: FormData){
    "use server"
    
    const name = formData.get("name")       // -- pegando o que é mandado no input
    if(name === '') return;                 // -- se o name for vazio para o codigo

    console.log(name)

    const data = {
      name: name,
    }

    const token = getCookieServer();
    await api.post('/category', data, {     // -- fazendo a requisição
      headers:{
        Authorization: `Bearer ${token}`
      }
    })  

    .catch((err) => {
      console.log(err)
      return;
    })

    redirect("/dashboard");  
  }

  return(
    <main className={styles.container}>
      <h1>Nova Categoria</h1>

      <form action={hendleRegisterCategory} className={styles.form}>
        <input 
          className={styles.input}
          type="text" 
          name="name" 
          placeholder="Nome da categoria, ex: Pizzas"
          required
        />

        <Button
          name="Cadastrar categoria"
        />            

      </form>

      <h2>Categorias Cadastradas</h2>
      <ViewCategory/>

    </main>
  )
}

