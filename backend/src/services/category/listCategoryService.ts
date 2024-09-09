import prismaClient from '../../prisma/index';

class ListCategoryService{

  async execute(){    // -- para listar as categorias -- pegar as categorias e devolver elas p o user

    const category = await prismaClient.category.findMany({   // -- findMany traz tudo q encontrar - faz a busca

      select:{        // -- select - tras somente id & name
        id: true,
        name: true
      }
    })

    return category;  // -- retornando todas as categorias

  }
}

export { ListCategoryService }