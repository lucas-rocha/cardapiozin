import { Blog_post, PrismaClient } from "@prisma/client";
import PrismaClientSingleton from "@src/databases/PrismaClient";

const prisma = new PrismaClient()

interface BlogPostDto {
  title: string;
  lead: string;
  content: string;
  image: string;
  restaurant_id: number | null;
}

export class BlogService {
  constructor(private prisma = PrismaClientSingleton.getInstance()) {}

  public async createPost(post: BlogPostDto): Promise<Blog_post> {
    const newBlogPost = await this.prisma.blog_post.create({
      data: {
        title: post.title,
        lead: post.lead,
        content: post.content,
        image: post.image,
        restaurant_id: post.restaurant_id
      }
    })

    return newBlogPost
  }
}