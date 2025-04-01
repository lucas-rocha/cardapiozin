"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const AuthService_1 = __importDefault(require("@src/services/AuthService"));
function authMiddleware(req, res, next) {
    var _a;
    const token = (_a = req.headers) === null || _a === void 0 ? void 0 : _a['x-access-token'];
    const claims = AuthService_1.default.decodeToken(token);
    const userId = claims.user_id;
    const restaurantId = claims.restaurant_id;
    const role = claims.role;
    req.context = { user_id: userId, restaurant_id: restaurantId, role };
    next();
}
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=AuthMiddleware.js.map