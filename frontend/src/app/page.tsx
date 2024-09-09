// -- PAGINA DE LOGIN

import styles from "./page.module.scss";
import logoImg from "/public/logoBrasa.png";
import Image from "next/image";
import Link from "next/link";
import { api } from "@/services/api";
import { redirect } from "next/navigation";          // -- para redirecionar o usuario
import { cookies } from "next/headers";

export default function Page() {

  async function handleLogin(formData: FormData) {
    "use server";

    const email = formData.get("email");
    const password = formData.get("password");

    if (email === "" || password === "") {
      return;
    }

    try {

      const response = await api.post("/session", {
        email,
        password
      })

      if (!response.data.token) {
        return;
      }

      // console.log(response.data)

      const expressTime = 60 * 60 * 24 * 30 * 1000;
      cookies().set("session", response.data.token, {     // -- salvando o cookies
        maxAge: expressTime,
        path: "/",
        httpOnly: false,
        secure: process.env.NODE_ENV === "production"
      })

    } catch (err) {
      console.log(err);
      return;
    }    
    redirect("/dashboard");
  }



  return (
    <>
      <div className={styles.containerCenter}>

        <Image
          src={logoImg}
          alt={"logo da pizzaria"}
        />

        <section className={styles.login}>
          <form action={handleLogin}>

            <h1 className={styles.h1Login}>Faça seu Login</h1>

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
              placeholder="Digite sua senha"
            />

            <button type={"submit"} className={styles.button}>
              Acessar sistema
            </button>

          </form>

          <Link href={"/signup"} className={styles.text}>
            Não Possui uma Conta? Cadastre-se!
          </Link>

        </section>

      </div>
    </>
  );
};
