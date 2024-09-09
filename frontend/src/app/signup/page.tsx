
  import Image from "next/image";
  import Link from "next/link";
  import styles from "../page.module.scss";
  import logoImg from "/public/logoBrasa.png";
  import { api } from "@/services/api";
  import { redirect } from "next/navigation"          // -- para redirecionar o usuario


  export default function Signup(){

    async function handleRegister(formData: FormData){
      "use server"                                    // -- para torna a funcao serverAction

      const name      = formData.get('name');
      const email     = formData.get('email');
      const password  = formData.get('password');

      if(name === "" && email === "" && password === ""){
        console.log('Preencha todos os campos')

        return;                                      // -- para parar
      }

      try {                                          // -- para criar a conta do usurio
        await api.post("/users",{
          name: name,
          email: email,
          password: password
        })

      }catch(err){
        console.log("error");
        console.log(err);

        // redirect("/signup");
      }

      redirect("/")                             // -- para redirecionar o usuario

      console.log(name, email, password);
    }


    return(
      <>
        <div className={styles.containerCenter}>

          <Image
          src={logoImg}
          alt={"logo da pizzaria"}
          />

          <section className={styles.login}>

            <h1>Criando sua conta</h1>

            <form action={handleRegister}>

              <input
               className={styles.loginInput}
               type="text"
               required
               name="name"
               placeholder="Digite seu nome"
               />

              <input
               className={styles.loginInput}
               type="email"
               required
               name="email"
               placeholder="Digite seu e-mail"
              />

              <input
               className={styles.loginInput}
               type="password"
               required
               name="password"
               placeholder="Sua senha"
              />

              <button type={"submit"} className={styles.button}>
               Cadastrar usuário
              </button>

            </form>

            <Link href={"/"} className={styles.text}>
             Já possui uma conta? Faça Login!
            </Link>

          </section>

         </div>
      </>

    )
  }