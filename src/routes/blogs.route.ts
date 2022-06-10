import { Router } from 'express';
import BlogsController from '@/controllers/blogs.controller';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateBlogDto } from '@/dtos/blog.dto';

class BlogsRoute implements Routes {
  public path = '/blogs';
  public router = Router();
  public blogsController = new BlogsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, authMiddleware, validationMiddleware(CreateBlogDto, 'body'), this.blogsController.createBlog);
    this.router.get(`${this.path}/search`, authMiddleware, this.blogsController.getBlogsByUser);
  }
}

export default BlogsRoute;
