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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserService = void 0;
const index_1 = __importDefault(require("../../prisma/index")); // -- posso importar sem {] pq exportamos ele exporte default
const bcryptjs_1 = require("bcryptjs"); // criptografando a senha com bcryptjs - hash para criptografar
class CreateUserService {
    // -- qndo usar o metodo execute ele vai fornecer name, email and password   -- repassa os dados
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, email, password }) {
            if (!email) { // -- verificar se ele enviou o email
                throw new Error('Email Incorreto');
            }
            // -- verificar se esse email ja está cadastrado
            const userAlreadyExists = yield index_1.default.user.findFirst({
                where: {
                    email: email
                }
            });
            if (userAlreadyExists) { // -- se encontrar um email ele entra dentro do if
                throw new Error("User already exists");
            }
            const passwordHash = yield (0, bcryptjs_1.hash)(password, 8); // --  antes de cadastrar o users -- criptografando a senha
            const user = yield index_1.default.user.create({
                data: {
                    name: name,
                    email: email,
                    password: passwordHash // -- senha criptografada
                },
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            });
            return user; // -- devolvendo para o usuario
        });
    }
}
exports.CreateUserService = CreateUserService;
