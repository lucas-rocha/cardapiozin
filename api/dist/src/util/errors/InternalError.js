"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalError = void 0;
class InternalError extends Error {
    constructor(message, code = 500, descripton) {
        super(message);
        this.message = message;
        this.code = code;
        this.descripton = descripton;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.InternalError = InternalError;
//# sourceMappingURL=InternalError.js.map