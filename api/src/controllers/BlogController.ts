import { Controller, Middleware, Post } from "@overnightjs/core";
import { authMiddleware } from "@src/middlewares/AuthMiddleware";
import fileUpload from "@src/middlewares/FileUpload";
import { BlogService } from "@src/services/BlogService";
import { Request, Response } from "express";

@Controller('blog')
export class BlogController {
  constructor(private _blogService: BlogService = new BlogService()) {}
  
  @Post('post')
  @Middleware([authMiddleware, ])
  public async create(req: Request, res: Response) {
    const imageFile = req.file.filename
    const newPostBlog = this._blogService.createPost({...req.body, ...{ restaurant_id: req.context.restaurant_id, image: imageFile }});

    return res.status(201).json(newPostBlog)
  }
}