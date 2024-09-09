import prismaClient from '../../prisma/index';  // -- posso importar sem {] pq exportamos ele exporte default
import { hash } from 'bcryptjs';                // criptografando a senha com bcryptjs - hash para criptografar

// -- recebendo os dados
// -- qndo alguem for usar o serviço vou criar uma interface do typescript

interface UserRequest{                          // -- obg informar sempre as types dos parâmetros que vamos receber
  name: string;
  email: string;
  password: string;
}

class CreateUserService {                                   // -- método async -- serviço
  // -- qndo usar o metodo execute ele vai fornecer name, email and password   -- repassa os dados

  async execute({ name, email, password }: UserRequest){    // -- executando a interface do typescript

    if(!email){                                             // -- verificar se ele enviou o email
      throw new Error('Email Incorreto');
    }

    // -- verificar se esse email ja está cadastrado
    const userAlreadyExists = await prismaClient.user.findFirst({  // -- se encontrar um email ja cadastrado vai colocar dentro de userAlreadyExists
      where:{
        email: email
      }
    })

    if(userAlreadyExists){                                  // -- se encontrar um email ele entra dentro do if
      throw new Error("User already exists");
    }

    const passwordHash = await hash(password, 8)      // --  antes de cadastrar o users -- criptografando a senha

    const user = await prismaClient.user.create({           // -- passando pelas verificações -- hora de cadastrar o user no BD
      data:{                                                // -- dentro da propriedade data passo os dados
        name: name,
        email: email,
        password: passwordHash                              // -- senha criptografada
      },
      select:{                                              // -- select para informar o que eu quero devolver
        id: true,
        name: true,
        email: true
      }
    })

    return user                                             // -- devolvendo para o usuario
  }
}

export  {CreateUserService};