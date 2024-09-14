"use strict";
// -- await createUsarService.execute - executando o método - serviço
// -- quero que ele espere essa cara para poder retornar para o usuário - usar o await
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
exports.CreateUserController = void 0;
const CreateUserService_1 = require("../../services/user/CreateUserService");
class CreateUserController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = req.body; // -- desconstruir do body - busca do doby os dados que o usuario enviou
            const createUsarService = new CreateUserService_1.CreateUserService(); // -- chamando o servico e instanciando/inicializando o serviço
            const user = yield createUsarService.execute({
                name,
                email,
                password
            });
            return res.json(user); // -- retornando o usuário
        });
    }
}
exports.CreateUserController = CreateUserController;
