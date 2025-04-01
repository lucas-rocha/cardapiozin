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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const axios_1 = __importDefault(require("axios"));
const decodeToken = (token) => {
    return jsonwebtoken_1.default.verify(token, 'ABCD');
};
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies['@cardapiozin.token'];
    if (token) {
        const claims = decodeToken(token);
        req.context.user_id = claims.user_id;
        const customer = yield (0, axios_1.default)(`http://localhost:5000/customers/me`, {
            headers: {
                'x-access-token': token
            }
        });
        if (customer) {
            req.context.customer = customer.data;
        }
    }
    next();
});
exports.default = authMiddleware;
