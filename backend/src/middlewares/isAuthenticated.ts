
import {NextFunction, Request, Response} from 'express'
import { verify } from 'jsonwebtoken'

interface Payload{
  sub: string;
}

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
){

  // Receber o token
  const authToken = req.headers.authorization;

  if(!authToken){
    return res.status(401).end();
  }

  const [, token] = authToken.split(" ")

  
  try{
    const { sub } = verify(     //Validar esse token.

      token,
      process.env.JWT_SECRET
    ) as Payload;

    req.user_id = sub;          //Recuperar o id do token e colocar dentro de uma variavel user_id dentro do req.

    
    return next();

  }catch(err){
    return res.status(401).end();
  }



}