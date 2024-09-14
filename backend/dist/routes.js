"use strict";
// -- para trabalhar com roteamento //
// -- GET - buscar / chamar / requisicao//
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
// -- importando os controllers
const CreateUserController_1 = require("./controllers/user/CreateUserController");
const AuthUserController_1 = require("./controllers/user/AuthUserController");
const DetailUserController_1 = require("./controllers/user/DetailUserController");
const CreateCategoryController_1 = require("./controllers/category/CreateCategoryController");
const ListCategoryController_1 = require("./controllers/category/ListCategoryController");
const CreateProductController_1 = require("./controllers/product/CreateProductController");
const ListByCategoryController_1 = require("./controllers/product/ListByCategoryController");
const CreateOrderController_1 = require("./controllers/order/CreateOrderController");
const RemoveOrderController_1 = require("./controllers/order/RemoveOrderController");
const AddItemController_1 = require("./controllers/order/AddItemController");
const RemoveItemController_1 = require("./controllers/order/RemoveItemController");
const SendOrderController_1 = require("./controllers/order/SendOrderController"); // -- tirando pedido de rascunho - draft
const ListOrderController_1 = require("./controllers/order/ListOrderController"); // -- listando os pedidos
const DetailOrderController_1 = require("./controllers/order/DetailOrderController"); // -- listando os detalhes da order
const FinishOrderController_1 = require("./controllers/order/FinishOrderController"); // -- fanalizar o pedido
const isAuthenticated_1 = require("./middlewares/isAuthenticated"); // -- autentificacao
const multer_1 = __importDefault(require("./config/multer"));
const multer_2 = __importDefault(require("multer"));
const router = (0, express_1.Router)();
exports.router = router;
const upload = (0, multer_2.default)(multer_1.default.upload('./tmp_temporario'));
// -- ROTAS USER  // -- isAuthenticated para somente pessoas logadas ter acesso
router.post('/users', new CreateUserController_1.CreateUserController().handle); // -- esta chamando o método handle() do controller
router.post('/session', new AuthUserController_1.AuthUserController().handle); // -- Rota de login do user - autentificação
router.get('/me', isAuthenticated_1.isAuthenticated, new DetailUserController_1.DetailUserController().handle); // -- buscar os detalhes do usuario - usando middleware
// -- ROTAS CATEGORY  // -- isAuthenticated para somente pessoas logadas ter acesso
router.post('/category', isAuthenticated_1.isAuthenticated, new CreateCategoryController_1.CreateCategoryController().handle); // -- post - para cadastrar
router.get('/category', isAuthenticated_1.isAuthenticated, new ListCategoryController_1.ListCategoryController().handle); // -- buscar
// -- ROTAS PRODUCT - MENU // -- isAuthenticated para somente pessoas logadas ter acesso
// router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle);    // -- para receber os dados
router.post('/product', isAuthenticated_1.isAuthenticated, new CreateProductController_1.CreateProductController().handle); // -- para receber os dados
router.get('/category/product', isAuthenticated_1.isAuthenticated, new ListByCategoryController_1.ListByCategoryController().handle); // -- get - buscar
// -- ROTAS ORDER
router.post('/order', isAuthenticated_1.isAuthenticated, new CreateOrderController_1.CreateOrderController().handle); // -- post - para cadastrar
router.delete('/order', isAuthenticated_1.isAuthenticated, new RemoveOrderController_1.RemoveOrderController().handle);
router.post('/order/add', isAuthenticated_1.isAuthenticated, new AddItemController_1.AddItemController().handle); // -- post - cadastrar um novo item - novo item
router.delete('/order/remove', isAuthenticated_1.isAuthenticated, new RemoveItemController_1.RemoveItemController().handle); // -- delete item
router.put('/order/send', isAuthenticated_1.isAuthenticated, new SendOrderController_1.SendOrderController().handle); // -- PUT para atualizar - tirar o pedido de rascunho
router.get('/orders', isAuthenticated_1.isAuthenticated, new ListOrderController_1.ListOrderController().handle); // -- get - para listar as order - pedidos
router.get('/order/detail', isAuthenticated_1.isAuthenticated, new DetailOrderController_1.DetailOrderController().handle); // -- listando os itens do pedido
router.put('/order/finish', isAuthenticated_1.isAuthenticated, new FinishOrderController_1.FinishOrderController().handle); // -- finalizano o pedido - alterando o status
