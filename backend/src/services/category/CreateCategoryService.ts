import prismaClient from "../../prisma";                            // -- para manipular o banco de dados

interface CategoryRequest{
  name: string;
}

class CreateCategoryService{

  async execute({ name }: CategoryRequest){

    if(name === ''){
      throw new Error('Nome invalido');                             // -- se o nome da categoria for vazio
    }

    const categoryAlreadyExists = await prismaClient.category.findFirst({
      where:{
        name: name
      }
    })

    if(categoryAlreadyExists){
      throw new Error('Categoria ja Existe');
    }

    const category = await prismaClient.category.create({           // -- retornando para o usuario
      data:{
        name: name
      },
      select:{
        id: true,
        name: true
      }
    })

    return category; // -- retornando para o controller
  }
}

export { CreateCategoryService };