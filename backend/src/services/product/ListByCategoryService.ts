import prismaClient from "../../prisma";

interface ProductRequest{                           // -- interface para poder tipar
  category_id: string;                              // -- para filtrar por category_id
}

class ListByCategoryService{                        //-- listando os produtos pelo id dentro de categoria dntro de um array

  async execute({ category_id }: ProductRequest){   // -- desconstruindo e pegando do ProductRequest

    const findByCategory = await prismaClient.product.findMany({  // -- buscando no BD
      where:{                                       // -- buscar todos produtos onde category_id = category_id
        category_id: category_id
      }
    })

    return findByCategory;
  }
}

export { ListByCategoryService }


// -- findMany() para acessar todos os produtos