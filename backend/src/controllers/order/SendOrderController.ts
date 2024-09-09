import { Request, Response } from 'express';
import { SendOrderService } from '../../services/order/SendOrderService';

class SendOrderController{

  async handle( req: Request, res: Response ){

    const { order_id } =  req.body;                       // recebe o id da order atravez do BODY

    const sendOrderService = new SendOrderService;

    const order = await sendOrderService.execute({     // -- caham o servico para ser executado
      order_id
    });

    return res.json(order)
  }
}

export { SendOrderController };