"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductController = void 0;
const CreateProductService_1 = require("../../services/product/CreateProductService");
const cloudinary_1 = require("cloudinary");
class CreateProductController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, price, description, category_id } = request.body;
            cloudinary_1.v2.config({
                cloud_name: process.env.CLOUDINARY_NAME,
                api_key: process.env.CLOUDINARY_KEY,
                api_secret: process.env.CLOUDINARY_SECRET,
            });
            const createProductService = new CreateProductService_1.CreateProductService();
            if (!request.files || Object.keys(request.files).length === 0) {
                throw new Error("error upload file");
            }
            else {
                if (!('file' in request.files)) {
                    throw new Error("error upload file");
                }
                ;
                const image = request.files['file'];
                if (Array.isArray(image))
                    return;
                const file = image;
                // console.log(file);
                // -- pegando a resposta 
                // -- resultFile - cloudinary devolve nesse objeto que foi salvo pela url
                const resultFile = yield new Promise((resolve, reject) => {
                    cloudinary_1.v2.uploader.upload_stream({}, function (error, result) {
                        if (error) {
                            console.log(error);
                            reject(error);
                            return;
                        }
                        resolve(result);
                    })
                        .end(file.data);
                });
                // -- mandando para o serviço
                const menu = yield createProductService.execute({
                    name,
                    price,
                    description,
                    banner: resultFile.url,
                    category_id
                });
                return response.json(menu);
            }
        });
    }
}
exports.CreateProductController = CreateProductController;
// import { Request, Response } from 'express';
// import { CreateProductService } from '../../services/product/CreateProductService';
// import { UploadedFile } from 'express-fileupload';
// import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_KEY,
//   api_secret: process.env.CLOUDINARY_SECRET
// })
// class CreateProductController {
//   async handle(request: Request, response: Response) {
//     const { name, price, description, category_id } = request.body;
//     const createProductService = new CreateProductService();
//     if (!request.files || Object.keys(request.files).length === 0) {
//       throw new Error('Error upload file image');
//     } else {
//       const file: UploadedFile = request.files["file"];
//       const resultFile: UploadApiResponse = await new Promise((resolve, reject) =>
//         cloudinary.uploader.upload_stream({}, function (error, result) {  // -- cadastrando a img no cloudinary
//           if (error) {
//             reject(error);
//             return;
//           }
//           resolve(result);
//         }).end(file.data);
//       })
//       console.log(resultFile.url);
//       return response.json({})
//       const product = await createProductService.execute({  // -- passando dados para o serviço
//         name,
//         price,
//         description,
//         banner: resultFile.url,
//         category_id,
//       });
//       return response.json(product);
//     }
//   }
// }
// export { CreateProductController };
// // // -- controller recebe do servico nessa varial product e retorna um json para o banco crinsa e slavando os dado
