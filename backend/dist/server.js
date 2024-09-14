"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors"); // sempre importada como segunda
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const routes_1 = require("./routes");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)()); // yarn add @types/cors -D  cors para instalar as tipagem do typescript
app.use((0, express_fileupload_1.default)({
    limits: { fileSize: 50 * 1024 * 1024 } // no maximo 50mb
}));
app.use(routes_1.router);
// -- acessa rurl da imagem ex: localhosta/3333/files/nome-imagem.png
app.use('/files', express_1.default.static(path_1.default.resolve(__dirname, '..', 'tmp_temporario')));
// criar barreira para erros usando um midalley // tratando erros
app.use((err, req, res, next) => {
    if (err instanceof Error) { // se for uma instacia do tipo Error quero lancar uma essecao
        return res.status(400).json({
            error: err.message
        });
    }
    return res.status(500).json({
        status: "error",
        message: "Internal Server Error!!!"
    });
});
app.listen(process.env.PORT, () => console.log("servidor online!!!! Bem-vindo Programador"));
