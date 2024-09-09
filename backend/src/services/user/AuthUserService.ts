import prismaClient from "../../prisma";    // -- importar o prisma para ter acesso ao banco de dados
import { compare } from 'bcryptjs';
import { sign } from "jsonwebtoken";        // -- para verificar a senha

interface AuthRequest{                      // -- qndo o users fazer o login ele me envia o email e a senha
  email: string;
  password: string;
}

class AuthUserService {

  async execute({email, password}: AuthRequest){

    const user = await prismaClient.user.findFirst({  // -- acessando nosso user do BD
      where: {                                              // -- where: - buscando usuario
        email: email
      }
    })

    if(!user){                                              // -- verificar se o email existe
      throw new Error("Usuário/Senha Incorreto!");
    }

    const passwordMatch = await compare(password, user.password);

    if(!passwordMatch){                                     // -- Verificar se a senha esta correta
      throw new Error("Usuário/Senha Incorreto!");
    }

    // -- se passar nas validações e se estou logando preciso gerar
    //    um token JWT e devolver os dados do usuário como id, name e email
    // -- se deu tudo certo vamos gerar o token para o usuario

    const token = sign(
      {                // -- colocando dentro do payload o nome e o email
        name: user.name,
        email: user.email
      },
      process.env.JWT_SECRET,   // -- buscando nossa chave do SECRET
      {
        subject: user.id,       // -- passando id do usuario
        expiresIn: '30d'        // -- qndo q vai expirar o token - 30dias
      }
    )                           // -- gerar um hash e salvar em uam variavel de ambiante

    return {                    // -- retornando o dados do usuario e o token
      id: user.id,
      name: user.name,
      email: user.email,
      token: token
    }

  }

}

export { AuthUserService };