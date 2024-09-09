import { Request, Response} from 'express';
import { AuthUserService } from '../../services/user/AuthUserService';

import { sign } from 'jsonwebtoken';  // -- sign para registrar/gerar um token --  precisa de tipagens @types


class AuthUserController {

  async handle(req: Request, res: Response){  // -- sempre dentro da class do controller tenho um metodo asnyc chamado  handle()

    const {email, password} = req.body;       // -- pegando o que o users esta mandando

    const authUserService = new AuthUserService; // -- chamando o servico e instanciando/inicializando o serviço

    const  auth = await authUserService.execute({  // -- chamando o metodo dele - awit para esperar a resposta
      email,
      password
    })

    return res.json(auth);
  }
}

export { AuthUserController }