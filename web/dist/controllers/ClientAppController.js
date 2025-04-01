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
exports.ClientAppController = void 0;
const ProductsService_1 = require("../services/ProductsService");
const CategoryService_1 = require("../services/CategoryService");
class ClientAppController {
    constructor() {
        this._productService = new ProductsService_1.ProductService();
        this._categoryService = new CategoryService_1.CategoryService();
        this.Index = this.Index.bind(this);
    }
    Index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const title = 'Burguer do Porto';
            const categories = yield this._categoryService.getAllCategories();
            const products = yield this._productService.getAllProducts();
            const restaurantInfo = req.context.restaurantSubdomain;
            const loggedCustomer = req.context.customer;
            return res.render('app', {
                layout: 'clientApp',
                title,
                categories,
                products,
                restaurantInfo,
                activePage: 'home',
                loggedCustomer
            });
        });
    }
    Sacola(req, res) {
        const title = 'Minha sacola - Burguer do Porto';
        const loggedCustomer = req.context.customer;
        return res.render('sacola', {
            layout: 'clientApp',
            title,
            activePage: 'sacola',
            loggedCustomer
        });
    }
    Conta(req, res) {
        const title = 'Conta - Burguer do Porto';
        const restaurantInfo = req.context.restaurantSubdomain;
        const loggedCustomer = req.context.customer;
        return res.render('conta', {
            layout: 'clientApp',
            title,
            restaurantInfo,
            activePage: 'conta',
            loggedCustomer
        });
    }
    checkout(req, res) {
        const title = 'Finalizar pedido - Burguer do Porto';
        return res.render('checkout', {
            layout: 'clientApp',
            title
        });
    }
    CriarConta(req, res) {
        const title = 'Criar conta - Burguer do Porto';
        const restaurantInfo = req.context.restaurantSubdomain || null;
        const loggedCustomer = req.context.customer;
        return res.render('criar-conta', {
            layout: 'clientApp',
            title,
            restaurantInfo,
            activePage: 'conta',
            loggedCustomer
        });
    }
}
exports.ClientAppController = ClientAppController;
