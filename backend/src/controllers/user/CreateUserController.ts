// -- await createUsarService.execute - executando o método - serviço
// -- quero que ele espere essa cara para poder retornar para o usuário - usar o await

import { Request, Response } from 'express';
import { CreateUserService } from '../../services/user/CreateUserService';

class CreateUserController{

  async handle(req: Request, res: Response){  // -- sempre dentro da class do controller tenho um metodo asnyc chamado  handle()

    const { name, email, password } = req.body          // -- desconstruir do body - busca do doby os dados que o usuario enviou

    const createUsarService = new CreateUserService();  // -- chamando o servico e instanciando/inicializando o serviço

    const user =  await createUsarService.execute({  // -- pega os dados e inicializa o serviço
      name,
      email,
      password
    });

    return res.json(user);     // -- retornando o usuário
  }
}

export { CreateUserController };