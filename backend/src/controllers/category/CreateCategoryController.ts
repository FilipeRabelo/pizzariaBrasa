import { Request, Response } from 'express';
import { CreateCategoryService } from '../../services/category/CreateCategoryService';

class CreateCategoryController{

  async handle(req: Request, res: Response){

    const { name } = req.body;                                          // -- pegando o nome do body

    const createCategoryService = new CreateCategoryService();          // -- instanciando

    const category = await createCategoryService.execute({      // -- executando o metodo
      name
    });

    return res.json(category);
  }
}

export { CreateCategoryController };