"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
class TokenService {
    static generateToken(user_id, restaurant_id, role) {
        return jsonwebtoken_1.jwt.sign({ user_id, restaurant_id, role }, 'ABCD');
    }
    static decodeToken(token) {
        return jsonwebtoken_1.jwt.verify(token, 'ABCD');
    }
}
exports.default = TokenService;
//# sourceMappingURL=TokenService.js.map