import prismaClient from "../../prisma/index";

class DetailUserService{

  async execute( user_id: string){

    const user = await prismaClient.user.findFirst({  // -- buscou o id no banco de dadas

      where:{
        id: user_id
      },
      select:{
        id: true,
        name: true,
        email: true
      }

    })

    return user;                                            // -- retornou o Id, nome, email do BD
  }
}

export { DetailUserService }