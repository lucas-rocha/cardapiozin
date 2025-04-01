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
exports.UserToRestaurantRequestDto = void 0;
const client_1 = require("@prisma/client");
const class_validator_1 = require("class-validator");
class UserToRestaurantRequestDto {
}
exports.UserToRestaurantRequestDto = UserToRestaurantRequestDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'Firstname should not be empty'
    }),
    __metadata("design:type", String)
], UserToRestaurantRequestDto.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'Lastname should not be empty'
    }),
    __metadata("design:type", String)
], UserToRestaurantRequestDto.prototype, "lastName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'Email should not be empty'
    }),
    __metadata("design:type", String)
], UserToRestaurantRequestDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'Password should not be empty'
    }),
    __metadata("design:type", String)
], UserToRestaurantRequestDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UserToRestaurantRequestDto.prototype, "role", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UserToRestaurantRequestDto.prototype, "accessType", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Password two should not be empty'
    }),
    __metadata("design:type", String)
], UserToRestaurantRequestDto.prototype, "passwordTwo", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UserToRestaurantRequestDto.prototype, "restaurant_id", void 0);
//# sourceMappingURL=UserToRestaurantRequestDto.js.map