import { Request, Response} from 'express';
import { AddItemService } from "../../services/order/AddItemService";

class AddItemController{

  async handle(req: Request, res: Response){

    // -- qndo alguem esta cadastrando algum itam novo numa nova order
    // -- eu preciso receber de dentro do body da req quais sao os itens

    const { order_id, product_id, amount } = req.body;

    const addItem = new AddItemService;

    const order = await addItem.execute({
      order_id,
      product_id,
      amount
    });

    return res.json(order);
  }
}

export { AddItemController };