import { Request, Response } from 'express';
import { RemoveItemServices } from "../../services/order/RemoveItemServices";

class RemoveItemController{

  async handle(req: Request, res: Response){

   const item_id = req.query.item_id as string;

   const removeItemServices = new RemoveItemServices();

   const order = await removeItemServices.execute({
     item_id
   })

    return res.json(order);

  }
}

export { RemoveItemController };