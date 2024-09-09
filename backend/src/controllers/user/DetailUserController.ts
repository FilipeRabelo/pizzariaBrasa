import { Request, Response } from 'express';
import { DetailUserService } from '../../services/user/DetailUserService';  // -- trazendo o servico

class DetailUserController {  // -- class do controller

  async handle(req: Request, res: Response){  // -- sempre dentro da class do controller tenho um metodo asnyc chamado handle()

    const user_id = req.user_id;

    console.log(`Id do user: ${user_id}`);

    const detailUserService = new DetailUserService();      // -- chamando o servico e instanciando/inicializando o serviço

    const user = await detailUserService.execute(user_id);  // -- executando o método - serviço


    return res.json(user);
  }
}

export  { DetailUserController };