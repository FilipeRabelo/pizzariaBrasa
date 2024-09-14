import express, { Request, Response, NextFunction } from 'express';
import "express-async-errors";        // sempre importada como segunda
import cors from "cors";
import path from "path";
import { router } from './routes';
import fileUpload from 'express-fileupload';


const app = express();

app.use(express.json());
app.use(cors());                        // yarn add @types/cors -D  cors para instalar as tipagem do typescript
app.use(fileUpload({
  limits:{ fileSize: 50 * 1024 * 1024} // no maximo 50mb
}));
app.use(router);



// -- acessa rurl da imagem ex: localhosta/3333/files/nome-imagem.png
app.use(
  '/files',
  express.static(path.resolve(__dirname, '..', 'tmp_temporario'))
)



// criar barreira para erros usando um midalley // tratando erros
app.use((err: Error, req: Request, res: Response, next: NextFunction) => { // tipando a variavel err como Error //

  if(err instanceof Error){            // se for uma instacia do tipo Error quero lancar uma essecao
    return res.status(400).json({
      error: err.message
    })
  }

  return res.status(500).json({        // se nao for um error do tipo 400 vai ser um internalError
    status: "error",
    message: "Internal Server Error!!!"
  })  
})



app.listen(process.env.PORT, () =>console.log("servidor online!!!! Bem-vindo Programador"));