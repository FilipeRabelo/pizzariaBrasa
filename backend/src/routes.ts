// -- para trabalhar com roteamento //
// -- GET - buscar / chamar / requisicao//

import { Router } from 'express';

// -- importando os controllers
import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';


import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController';


import { CreateProductController } from './controllers/product/CreateProductController';
import { ListByCategoryController } from './controllers/product/ListByCategoryController';


import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { RemoveOrderController } from "./controllers/order/RemoveOrderController";

import { AddItemController } from "./controllers/order/AddItemController";
import { RemoveItemController } from "./controllers/order/RemoveItemController";
import { SendOrderController } from "./controllers/order/SendOrderController";      // -- tirando pedido de rascunho - draft

import { ListOrderController } from "./controllers/order/ListOrderController"       // -- listando os pedidos
import { DetailOrderController } from "./controllers/order/DetailOrderController";  // -- listando os detalhes da order
import { FinishOrderController } from "./controllers/order/FinishOrderController";  // -- fanalizar o pedido

import { isAuthenticated } from './middlewares/isAuthenticated';                    // -- autentificacao

import uploadConfig from './config/multer';

import multer from "multer";

const router = Router();

const upload = multer(uploadConfig.upload('./tmp_temporario'));


// -- ROTAS USER  // -- isAuthenticated para somente pessoas logadas ter acesso

router.post('/users', new CreateUserController().handle);      // -- esta chamando o método handle() do controller
router.post('/session', new AuthUserController().handle);      // -- Rota de login do user - autentificação
router.get('/me', isAuthenticated, new DetailUserController().handle);  // -- buscar os detalhes do usuario - usando middleware


// -- ROTAS CATEGORY  // -- isAuthenticated para somente pessoas logadas ter acesso

router.post('/category', isAuthenticated, new CreateCategoryController().handle);  // -- post - para cadastrar
router.get('/category', isAuthenticated, new ListCategoryController().handle); // -- buscar


// -- ROTAS PRODUCT - MENU // -- isAuthenticated para somente pessoas logadas ter acesso

// router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle);    // -- para receber os dados
router.post('/product', isAuthenticated, new CreateProductController().handle);    // -- para receber os dados
router.get('/category/product', isAuthenticated, new ListByCategoryController().handle); // -- get - buscar

// -- ROTAS ORDER

router.post('/order', isAuthenticated, new CreateOrderController().handle);   // -- post - para cadastrar
router.delete('/order', isAuthenticated, new RemoveOrderController().handle);

router.post('/order/add', isAuthenticated, new AddItemController().handle);  // -- post - cadastrar um novo item - novo item
router.delete('/order/remove', isAuthenticated, new RemoveItemController().handle);   // -- delete item

router.put('/order/send', isAuthenticated, new SendOrderController().handle) // -- PUT para atualizar - tirar o pedido de rascunho

router.get('/orders', isAuthenticated, new ListOrderController().handle);   // -- get - para listar as order - pedidos
router.get('/order/detail', isAuthenticated, new DetailOrderController().handle); // -- listando os itens do pedido

router.put('/order/finish', isAuthenticated, new FinishOrderController().handle); // -- finalizano o pedido - alterando o status

export { router };

















