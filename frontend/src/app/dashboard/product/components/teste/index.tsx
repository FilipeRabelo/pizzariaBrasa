"use client"

import { useEffect, useState }  from "react";
import { getCookieClient }      from "@/lib/cookieClient";       // Importando o getCookieServer
import { api }                  from "@/services/api";                       // Importando a api
import styles                   from "./styles.module.scss"

export function ViewProduct() {
  
  const [products, setProducts] = useState([]); // Estado para armazenar as categorias

  // Função para buscar as categorias ao carregar a página
  
  useEffect(() => {
    async function fetchProducts() {
      try {
        const token = getCookieClient();
        const response = await api.get('/category/product', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log(response.data)

        setProducts(response.data); // Armazena as categorias no estado
      } catch (err) {
        console.error("Erro ao buscar categorias:", err);
      }
    }

    fetchProducts(); // Chama a função ao carregar a página
  }, []);

  return (
    <main className={styles.container}>
      <h2>Produtos Cadastrados - H2 - ViewProduct - </h2>

      <ol>
        {products.map((product: any) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ol>
    </main>

  );
}