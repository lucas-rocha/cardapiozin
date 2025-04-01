"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authCustomerMiddleware = void 0;
const AuthService_1 = __importDefault(require("@src/services/AuthService"));
function authCustomerMiddleware(req, res, next) {
    var _a;
    const token = (_a = req.headers) === null || _a === void 0 ? void 0 : _a['x-access-token'];
    const claims = AuthService_1.default.decodeToken(token);
    const customer_id = claims.user_id;
    const restaurant_id = claims.restaurant_id;
    req.context = { customer_id, restaurant_id };
    next();
}
exports.authCustomerMiddleware = authCustomerMiddleware;
//# sourceMappingURL=AuthCustomerMiddleware.js.map