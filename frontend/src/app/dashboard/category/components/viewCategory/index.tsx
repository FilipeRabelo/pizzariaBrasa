"use client"

import { useEffect, useState } from "react";
import { getCookieClient } from "@/lib/cookieClient"; // Importando o getCookieServer
import { api } from "@/services/api"; // Importando a api

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
      <h2>Categorias Cadastradas</h2>
      <ol>
        {categories.map((category: any) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ol>
    </main>
  );
}




////////////////////////////////////////





// "use client"

// import { useEffect, useState } from "react";
// import { getCookieClient } from "@/lib/cookieClient"; // Função para obter cookies no cliente
// import { api } from "@/services/api"; // Importando a api
// import styles from "./styles.module.scss"

// // Definindo a interface para a Categoria
// interface Category {
//   id: string;
//   name: string;
// }

// export function ViewCategory() {
//   const [categories, setCategories] = useState<Category[]>([]); // Estado para armazenar as categorias

//   // Função para buscar as categorias ao carregar a página
//   useEffect(() => {
//     async function fetchCategories() {
//       try {
//         const token = getCookieClient();
//         const response = await api.get<Category[]>('/category', {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });

//         setCategories(response.data); // Armazena as categorias no estado
//       } catch (err) {
//         console.error("Erro ao buscar categorias:", err);
//       }
//     }

//     fetchCategories(); // Chama a função ao carregar a página
//   }, []);

//   // Função para deletar uma categoria
//   async function handleDeleteCategory(id: string) {
//     try {
//       const token = getCookieClient();
//       await api.delete(`/category/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       // Atualiza a lista de categorias após a exclusão
//       setCategories(prevCategories => prevCategories.filter(category => category.id !== id));
//     } catch (err) {
//       console.error("Erro ao deletar categoria:", err);
//     }
//   }

//   return (
//     <main className={styles.container}>
//       <h2>Categorias Cadastradas</h2>
//       <ol>
//         {categories.map((category: Category) => (
//           <li key={category.id} className={styles.categoryItem}>
//             {category.name}
//             <button
//               className={styles.deleteButton}
//               onClick={() => handleDeleteCategory(category.id)}
//             >
//               Deletar
//             </button>
//           </li>
//         ))}
//       </ol>
//     </main>
//   );
// }
