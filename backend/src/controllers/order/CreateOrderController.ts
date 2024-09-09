import { Response, Request } from 'express';

import {CreateOrderService} from "../../services/order/CreateOrderService";

class CreateOrderController{

  async handle(req: Request, res: Response){

    const { table, name } = req.body;       // -- pegando o que o user vai informar - numeor da mesa e nome do cliente

    const createOrderService = new CreateOrderService;                // -- iniciando - instanciando

    const order = await createOrderService.execute({    // -- executando -
      table,
      name,
    });

    return res.json(order);
  }
}

export { CreateOrderController };