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
exports.AdditionalItemRequest = void 0;
const class_validator_1 = require("class-validator");
let IsTwoDecimalMinValue = class IsTwoDecimalMinValue {
    validate(value, args) {
        const decimalPattern = /^\d+(\.\d{1,2})?$/;
        return decimalPattern.test(value.toString()) && value >= 0.01;
    }
    defaultMessage(args) {
        return "Price must be a number with two decimal places and a minimum value of 0.01.";
    }
};
IsTwoDecimalMinValue = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: "isTwoDecimalMinValue", async: false })
], IsTwoDecimalMinValue);
class AdditionalItemRequest {
}
exports.AdditionalItemRequest = AdditionalItemRequest;
__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: "Category name should not be empty",
    }),
    (0, class_validator_1.Length)(1, 50),
    __metadata("design:type", String)
], AdditionalItemRequest.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }, { message: "Price must be a number with up to two decimal places." }),
    (0, class_validator_1.Validate)(IsTwoDecimalMinValue),
    __metadata("design:type", Number)
], AdditionalItemRequest.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)({
        message: "Quantity should not be empty",
    }),
    (0, class_validator_1.Min)(1, {
        message: "Quantity must be a positive integer",
    }),
    __metadata("design:type", Number)
], AdditionalItemRequest.prototype, "quantity", void 0);
//# sourceMappingURL=AdditionalItemRequest.js.map