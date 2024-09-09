
// -- HEADER DASHBOARD

"use client"

import Link from "next/link";
import styles from "./styles.module.scss";
import Image from "next/image";
import logoImg from "/public/logoBrasa.png";
import { LogOutIcon } from "lucide-react";
import { deleteCookie } from "cookies-next"; "cookies-next";

import { useRouter } from "next/navigation";    // -- so podemos usar o useRoter em componente "use client"
import { toast } from "sonner";

export default function Header() {

  // -- botao logout
  const router = useRouter();                   // -- iniciando ele dentro do componente
  
  async function handleLogout(){                // -- qndo clicar no botao, vai apagar o token do usuario
    deleteCookie("session", {path: "/"});       // -- session é o nome que dei para os cookies
    toast.success("Logout feito com sucesso - Até breve"); 
    router.replace("/");
  }   

  return (
    <>
      <header className={styles.headerContainer}>
        <div className={styles.headerContent}>

          <Link href={"/dashboard"} className={styles.logo}>
            <Image
              src={logoImg}
              alt="Logo Pizzaria"
              width={190}
              height={60}
              priority={true}
              quality={100}
            />
          </Link>

          <nav>

            <Link href={"/dashboard"}>
              Home
            </Link>

            <Link href={"/dashboard/category"}>
              Categorias
            </Link>

            <Link href={"/dashboard/product"}>
              Produtos
            </Link>      

            <form action={handleLogout}>
              <button type="submit" className="">
                <LogOutIcon size={24} />
              </button>
            </form>

          </nav>

        </div>
      </header>
    </>
  )
}

