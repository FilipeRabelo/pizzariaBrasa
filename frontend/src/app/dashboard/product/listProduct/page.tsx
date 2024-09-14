"use client"

import styles                   from "./styles.module.scss"
import { useEffect, useState }  from "react";
import { getCookieClient }      from "@/lib/cookieClient";       // Importando o getCookieServer
import { api }                  from "@/services/api";                       // Importando a api


export default function ListProduct(){

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
      
      <h1>Produtos Cadastrados</h1>

      <ol>
        {products.map((product: any) => (
          <li key={product.id}>
            <div>
              <strong>Nome:</strong> {product.name}
            </div>
            <div className={styles.div2}>
              <strong>Descrição:</strong> {product.description}
            </div>
          </li>
        ))}
      </ol>

    </main>

  );
}