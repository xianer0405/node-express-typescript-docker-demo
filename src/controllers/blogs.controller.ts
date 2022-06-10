import { NextFunction, Request, Response } from 'express';
import { CreateBlogDto } from '@/dtos/blog.dto';
import { Blog } from '@/interfaces/blog.interface';
import { RequestWithUser } from '@/interfaces/auth.interface';
import BlogsService from '@/services/blogs.service';

class BlogController {
    public blogsService: BlogsService = new BlogsService();

    public createBlog = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const blogData: CreateBlogDto = req.body;
            const createBlogData: Blog = await this.blogsService.createBlog(req.user, blogData);

            res.status(201).json({ data: createBlogData, message: 'created' });
        } catch (error) {
            next(error);
        }
    }

    public getBlogsByUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const blogs: Blog[] = await this.blogsService.findBlogs(req.user);

            res.status(201).json({ data: blogs, message: 'getBlogsByUser' });
        } catch (error) {
            next(error);
        }
    }
}

export default BlogController;