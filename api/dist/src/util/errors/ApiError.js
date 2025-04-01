"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnprocessableError = exports.NotFound = exports.UnauthorizedError = exports.BadRequestError = exports.ConflictError = void 0;
const InternalError_1 = require("./InternalError");
class ApiError extends InternalError_1.InternalError {
    constructor(message, code, description = 'Internal server error') {
        super(message, code, description);
    }
}
exports.default = ApiError;
class ConflictError extends ApiError {
    constructor(message) {
        super(message, 409);
    }
}
exports.ConflictError = ConflictError;
class BadRequestError extends ApiError {
    constructor(message) {
        super(message, 400);
    }
}
exports.BadRequestError = BadRequestError;
class UnauthorizedError extends ApiError {
    constructor(message) {
        super(message, 401);
    }
}
exports.UnauthorizedError = UnauthorizedError;
class NotFound extends ApiError {
    constructor(message) {
        super(message, 404);
    }
}
exports.NotFound = NotFound;
class UnprocessableError extends ApiError {
    constructor(message) {
        super(message, 422);
    }
}
exports.UnprocessableError = UnprocessableError;
//# sourceMappingURL=ApiError.js.map