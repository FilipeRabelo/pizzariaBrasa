"use strict";
// instaciando a variavel como nova prisma client
// precisamos importar para o service para ter acesso ao banco de dados
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prismaClient = new client_1.PrismaClient();
exports.default = prismaClient;
