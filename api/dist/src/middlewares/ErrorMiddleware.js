"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const errorMiddleware = (error, _, res, __) => {
    const statusCode = error.code || 500;
    const message = error.code ? error.message : 'Something went wrong!';
    return res.status(statusCode).json({
        code: statusCode,
        message
    });
};
exports.errorMiddleware = errorMiddleware;
//# sourceMappingURL=ErrorMiddleware.js.map