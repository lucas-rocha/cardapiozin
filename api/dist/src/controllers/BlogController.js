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
exports.BlogController = void 0;
const core_1 = require("@overnightjs/core");
const AuthMiddleware_1 = require("@src/middlewares/AuthMiddleware");
const BlogService_1 = require("@src/services/BlogService");
let BlogController = class BlogController {
    constructor(_blogService = new BlogService_1.BlogService()) {
        this._blogService = _blogService;
    }
    async create(req, res) {
        const imageFile = req.file.filename;
        const newPostBlog = this._blogService.createPost({ ...req.body, ...{ restaurant_id: req.context.restaurant_id, image: imageFile } });
        return res.status(201).json(newPostBlog);
    }
};
exports.BlogController = BlogController;
__decorate([
    (0, core_1.Post)('post'),
    (0, core_1.Middleware)([AuthMiddleware_1.authMiddleware,]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "create", null);
exports.BlogController = BlogController = __decorate([
    (0, core_1.Controller)('blog'),
    __metadata("design:paramtypes", [BlogService_1.BlogService])
], BlogController);
//# sourceMappingURL=BlogController.js.map