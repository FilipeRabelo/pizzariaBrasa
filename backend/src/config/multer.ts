import crypto from 'crypto';              // -- para nao dx as imagens e nomes se repitirem
import multer from 'multer';

import { extname, resolve } from 'path';  // -- para pegar os caminhos

export default {

  upload(folder: string){

    return{
      storage: multer.diskStorage({

        destination: resolve(__dirname, '..', '..', folder),

        filename: (request, file, callback) => {              // -- pegando do multer

          const fileHash = crypto.randomBytes(16).toString("hex");
          const fileName = `${fileHash}-${file.originalname}`;

          return callback(null, fileName);
        }
      })
    }
  }
}