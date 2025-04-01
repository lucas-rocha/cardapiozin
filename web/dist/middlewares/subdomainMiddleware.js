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
const RestaurantService_1 = require("../services/RestaurantService");
const subdomainMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const host = req.headers.host;
    const subdomain = host === null || host === void 0 ? void 0 : host.split('.')[0];
    req.context = req.context || {};
    if (subdomain !== 'localhost') {
        const restaurant = yield RestaurantService_1.RestaurantService.findBySubdomain(subdomain);
        if (restaurant) {
            req.context.restaurantSubdomain = restaurant;
            res.cookie("restaurantSub", restaurant.id, { maxAge: 3600000 });
        }
    }
    next();
});
exports.default = subdomainMiddleware;
