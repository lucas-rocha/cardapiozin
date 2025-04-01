"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restaurantGuardMiddleware = void 0;
const ApiError_1 = require("@src/util/errors/ApiError");
function restaurantGuardMiddleware(req, res, next) {
    var _a, _b;
    if (((_a = req.context) === null || _a === void 0 ? void 0 : _a.restaurant_id) !== ((_b = req.params) === null || _b === void 0 ? void 0 : _b.restaurantId)) {
        throw new ApiError_1.UnauthorizedError('Unauthorized restaurant!');
    }
    next();
}
exports.restaurantGuardMiddleware = restaurantGuardMiddleware;
//# sourceMappingURL=RestaurantGuardMiddleware.js.map