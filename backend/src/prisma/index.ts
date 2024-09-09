
// instaciando a variavel como nova prisma client
// precisamos importar para o service para ter acesso ao banco de dados

import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export default prismaClient;