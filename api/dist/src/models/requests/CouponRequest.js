"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponRequest = void 0;
const class_validator_1 = require("class-validator");
class CouponRequest {
}
exports.CouponRequest = CouponRequest;
__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'Coupon name should not be empty'
    }),
    __metadata("design:type", String)
], CouponRequest.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'Value should not be empty'
    }),
    __metadata("design:type", Number)
], CouponRequest.prototype, "value", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1, {
        message: 'Quantity must be a positive integer'
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Quantity should not be empty'
    }),
    __metadata("design:type", Number)
], CouponRequest.prototype, "quantity", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'Start date should not be empty'
    }),
    __metadata("design:type", Date)
], CouponRequest.prototype, "startAt", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'Finish date should not be empty'
    }),
    __metadata("design:type", Date)
], CouponRequest.prototype, "finishAt", void 0);
//# sourceMappingURL=CouponRequest.js.map