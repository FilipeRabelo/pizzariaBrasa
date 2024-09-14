"use client"

import { useEffect, useState } from "react";
import { getCookieClient } from "@/lib/cookieClient";       // Importando o getCookieServer
import { api } from "@/services/api";                       // Importando a api

import styles from "./styles.module.scss"

export function ViewCategory() {
  
  const [categories, setCategories] = useState([]); // Estado para armazenar as categorias

  // Função para buscar as categorias ao carregar a página
  
  useEffect(() => {
    async function fetchCategories() {
      try {
        const token = getCookieClient();
        const response = await api.get('/category', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setCategories(response.data); // Armazena as categorias no estado
      } catch (err) {
        console.error("Erro ao buscar categorias:", err);
      }
    }

    fetchCategories(); // Chama a função ao carregar a página
  }, []);

  return (
    <main className={styles.container}>
      {/* <h2>Categorias Cadastradas</h2> */}

      <ol>
        {categories.map((category: any) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ol>
    </main>
  );
}