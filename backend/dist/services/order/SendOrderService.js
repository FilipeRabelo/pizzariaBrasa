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
exports.SendOrderService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class SendOrderService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ order_id }) {
            const order = yield prisma_1.default.order.update({
                where: {
                    id: order_id // -- pegando somente o id e passando para o order_id
                },
                data: {
                    draft: false // -- altera a propriedade TRUE  para FALSE -- para tirar o draft do rascunho e enviar ela pra cozinha
                }
            }); // -- draft = rascunho.
            return order;
        });
    }
}
exports.SendOrderService = SendOrderService;
// -- const order = await prismaClient.order.update - para acessar a tabela order e alterar
