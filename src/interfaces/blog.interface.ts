import { User } from "./users.interface";

export type BlogStatus = 'DRAFT' | 'PUBLISHED';

export interface Blog {
    id: number;
    title: string;
    content: string;
    status: BlogStatus;
    authorId: number;
}