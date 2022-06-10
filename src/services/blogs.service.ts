import DB from "@/databases";
import { Op } from "sequelize";
import { CreateBlogDto } from "@/dtos/blog.dto";
import { Blog } from "@/interfaces/blog.interface";
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import { isEmpty } from '@utils/util';
import { UserModel } from "@/models/users.model";

class BlogsService {
    public blog = DB.Blog;

    public async findBlogs(user: User): Promise<Blog[]> {
        const blogsWithUser: Blog[] = await this.blog.findAll({ include: UserModel, where: { authorId: { [Op.eq]: user.id } } });
        return blogsWithUser;
    }

    public async createBlog(user: User, blogData: CreateBlogDto): Promise<Blog> {
        if (isEmpty(blogData)) throw new HttpException(400, "You're not userData");

        console.info('blogData:', JSON.stringify(blogData));
        const createBlogData: Blog = await this.blog.create({
            ...blogData,
            authorId: user.id,
            status: 'DRAFT'
        });
        return createBlogData;
    }
}

export default BlogsService;