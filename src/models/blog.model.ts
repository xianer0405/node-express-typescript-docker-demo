import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

import { Blog, BlogStatus } from '@interfaces/blog.interface';
import { UserModel } from '@models/users.model';

export type BlogCreationAttributes = Optional<Blog, 'id' | 'title' | 'content' | 'status'>;

export class BlogModel extends Model<Blog, BlogCreationAttributes> implements Blog {
    public id: number;
    public title: string;
    public content: string;
    public status: BlogStatus;
    public authorId: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof BlogModel {
    BlogModel.init(
        {
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            title: {
                allowNull: false,
                type: DataTypes.STRING(200),
            },
            content: {
                allowNull: true,
                type: DataTypes.TEXT('long'),
            },
            status: {
                allowNull: false,
                type: DataTypes.STRING(20),
            },
            authorId: {
                type: DataTypes.INTEGER,
                references: {
                    model: UserModel,
                    key: 'id'
                }
            }
        }, {
            tableName: 'blog',
            modelName: 'blog',
            sequelize
        }
    );

    BlogModel.belongsTo(UserModel, {
        foreignKey: 'authorId'
    });

    return BlogModel;
}
