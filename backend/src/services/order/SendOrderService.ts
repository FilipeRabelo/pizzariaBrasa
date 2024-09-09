import prismaClient from "../../prisma";

interface OrderRequest{
  order_id: string;
}

class SendOrderService{    // -- para editar um pedido especifico e alterar o status (draft)

  async execute({order_id}: OrderRequest){

    const order = await prismaClient.order.update({

      where:{          // -- atualizando um item em específico
        id: order_id   // -- pegando somente o id e passando para o order_id
      },
      data:{
        draft: false   // -- altera a propriedade TRUE  para FALSE -- para tirar o draft do rascunho e enviar ela pra cozinha
      }

    })  // -- draft = rascunho.

    return order;

  }
}

export { SendOrderService };

// -- const order = await prismaClient.order.update - para acessar a tabela order e alterar