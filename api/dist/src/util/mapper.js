"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapper = void 0;
function mapper(obj, constructor) {
    const mappedObject = new constructor(...Object.values(obj));
    return Object.assign(mappedObject, obj);
}
exports.mapper = mapper;
//# sourceMappingURL=mapper.js.map