"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const HomeController_1 = require("./controllers/HomeController");
const BlogController_1 = require("./controllers/BlogController");
const CadastroController_1 = require("./controllers/CadastroController");
const ClientAppController_1 = require("./controllers/ClientAppController");
const LeadController_1 = require("./controllers/LeadController");
const authMiddleware_1 = __importDefault(require("./middlewares/authMiddleware"));
const routes = (0, express_1.Router)();
const homeController = new HomeController_1.HomeController();
const blogController = new BlogController_1.BlogController();
const leadController = new LeadController_1.LeadController();
const cadastroController = new CadastroController_1.CadastroController();
const clientAppController = new ClientAppController_1.ClientAppController();
routes.get('/', authMiddleware_1.default, (req, res) => {
    if (req.context.restaurantSubdomain) {
        return clientAppController.Index(req, res);
    }
    else {
        return homeController.Index(req, res);
    }
});
routes.get('/sacola', authMiddleware_1.default, (req, res) => {
    if (req.context.restaurantSubdomain) {
        return clientAppController.Sacola(req, res);
    }
});
routes.get('/conta', authMiddleware_1.default, (req, res) => {
    if (req.context.restaurantSubdomain) {
        return clientAppController.Conta(req, res);
    }
});
routes.get('/pedidos/finalizar', authMiddleware_1.default, (req, res) => {
    if (req.context.restaurantSubdomain) {
        return clientAppController.checkout(req, res);
    }
});
routes.get('/criar-conta', authMiddleware_1.default, (req, res) => {
    if (req.context.restaurantSubdomain) {
        return clientAppController.CriarConta(req, res);
    }
});
// routes.get('/hamburgueria', (req, res) => {
//     return clientAppController.Index(req, res) 
// })
// routes.get('/sacola', (req, res) => {
//     return clientAppController.Sacola(req, res) 
// })
routes.post('/', homeController.GetLead);
routes.get('/pre-inscricao-exclusiva', cadastroController.Index);
routes.get('/blog', blogController.Index);
routes.post('/api/leads', leadController.createLead);
routes.get('/parabens', leadController.congratulateLead);
exports.default = routes;
