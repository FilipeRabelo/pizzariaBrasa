"use client"

import Image from "next/image";
import styles from "./styles.module.scss"
import Link from "next/link";
import { UploadCloud } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { Button } from "@/app/dashboard/components/button"
import { api } from "@/services/api";
import { getCookieClient } from "@/lib/cookieClient";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


interface CategoryProps {
  id: string,
  name: string
}

interface Props {
  categories: CategoryProps[];
}

export function Form({ categories }: Props) {

  const router = useRouter();
  const [image, setImage] = useState<File>();
  const [previewImage, setPreviewImage] = useState("");       //  img comeca vazio

  async function handleRegisterProduct(formData: FormData) {   //-- pegando o que foi digitado 

    const categoryIndex = formData.get("category");
    const name = formData.get("name");
    const price = formData.get("price");
    const description = formData.get("description")

    if (!name || !price || !description || !categoryIndex || !image) {
      toast.warning("Preencha todos os campos");
      return;
    }

    const data = new FormData();

    data.append("name", name);
    data.append("price", price);
    data.append("description", description);
    data.append("category_id", categories[Number(categoryIndex)].id);
    data.append("file", image)


    const token = getCookieClient();        // -- pegando o token do user q esta logado
    await api.post("/product", data, {      // -- enviando a requisição
      headers: {
        Authorization: `Bearer ${token}`    // -- passando o token
      }
    })

      .catch((err) => {
        toast.warning("Falha ao cadastrar o produto!");
        console.error(err);
        return;
      })

    toast.success("Produto registrado com sucesso!");
    router.push("/dashboard");

  }

  function handleFile(e: ChangeEvent<HTMLInputElement>) {

    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];

      if (image.type !== "image/jpeg" && image.type !== "image/png") {
        toast.warning("Formato de imagem não permitido!");
        return;
      }

      setImage(image);
      setPreviewImage(URL.createObjectURL(image));  // colocando a img para ver

    }
  }

  return (
    <main className={styles.container}>
      <h1>Novo produto</h1>

      <form className={styles.form} action={handleRegisterProduct}>

        <label className={styles.labelImage}>
          <span>
            <UploadCloud size={30} color="#39ff14" />
          </span>

          <input
            type="file"
            accept="image/png, image/jpeg"
            required
            onChange={handleFile}       // obrigatório ser "use client"
          />

          {/* -- se tiver alguma img eu renderiso  */}

          {previewImage && (
            <Image
              alt="Imagem de Preview"
              src={previewImage}
              className={styles.previewImage}
              fill={true}
              quality={100}
              priority={true}
            />
          )}

        </label>

        <select name="category">
          {categories.map((category, index) => (
            <option key={category.id} value={index}>
              {category.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="name"
          placeholder="Digite o nome do produto..."
          required
          className={styles.input}
        />

        <input
          type="text"
          name="price"
          placeholder="Digite o preço do produto..."
          required
          className={styles.input}
        />

        <textarea
          className={styles.input}
          placeholder="Digite a descrição do produto..."
          required
          name="description"
        >
        </textarea>

        <Button name="Cadastrar novo produto" />


      <Link href={"product/listProduct"}>
        <button className={styles.btnListProduct}>
          Ver Produtos Cadastrados
        </button>
      </Link>

      </form>

    </main>
  )
}