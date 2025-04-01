"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthService_1 = __importDefault(require("@src/services/AuthService"));
const AuthMiddleware_1 = require("../AuthMiddleware");
describe('Auth middleware', () => {
    it('should verify a JWT token and call the next middleware', () => {
        const jwtToken = AuthService_1.default.generateToken(1);
        const reqFake = {
            headers: {
                'x-access-token': jwtToken
            }
        };
        const resFake = {};
        const nextFake = jest.fn();
        (0, AuthMiddleware_1.authMiddleware)(reqFake, resFake, nextFake);
        expect(nextFake).toHaveBeenCalled();
    });
});
//# sourceMappingURL=auth.test.js.map