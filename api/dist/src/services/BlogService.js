"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogService = void 0;
const client_1 = require("@prisma/client");
const PrismaClient_1 = __importDefault(require("@src/databases/PrismaClient"));
const prisma = new client_1.PrismaClient();
class BlogService {
    constructor(prisma = PrismaClient_1.default.getInstance()) {
        this.prisma = prisma;
    }
    async createPost(post) {
        const newBlogPost = await this.prisma.blog_post.create({
            data: {
                title: post.title,
                lead: post.lead,
                content: post.content,
                image: post.image,
                restaurant_id: post.restaurant_id
            }
        });
        return newBlogPost;
    }
}
exports.BlogService = BlogService;
//# sourceMappingURL=BlogService.js.map