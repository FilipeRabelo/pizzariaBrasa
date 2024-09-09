import prismaClient from "../../prisma";

interface OrderRequest{                        // -- passar o que o usuario precisa enviar
  table: number,                               // -- numero da mesa
  name: string,
}

class CreateOrderService{

  // -- chamando o execute do controller
  async execute({table, name}: OrderRequest){   // -- desconstruindo e trazendo da interface OrderRequest

    const order = await prismaClient.order.create({
      data:{
        table: table,                           // -- passando a mesa para dentro da variavel order
        name: name
      }
    })

    return order;                               // -- retornando para o controler os dados dentro de order (table, name)

  }
}

export { CreateOrderService };