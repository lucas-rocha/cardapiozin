"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateInputs = void 0;
const class_validator_1 = require("class-validator");
const mapper_1 = require("./mapper");
const ApiError_1 = require("./errors/ApiError");
async function validateInputs(obj, constructor) {
    const newObject = (0, mapper_1.mapper)(obj, constructor);
    const validationErrors = await (0, class_validator_1.validate)(newObject);
    console.log(validationErrors);
    if (validationErrors.length > 0)
        throw new ApiError_1.BadRequestError('Some fields are missing or invalid!');
    return newObject;
}
exports.validateInputs = validateInputs;
//# sourceMappingURL=validate.js.map