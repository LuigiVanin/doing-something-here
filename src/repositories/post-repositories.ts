import { CreatePost } from "./../@types/post/create";
import { None, Some } from "@sniptt/monads/build";
import { Repository } from "./../@types/repository";
import { Post, Prisma, User } from "@prisma/client";
import { Option } from "@sniptt/monads/build";
import prisma from "../db";
import { PostQueryOptions } from "../@types/post/post-query-options";

export class PostRepository implements Repository<Post> {
    async create(data: CreatePost) {
        try {
            const post = await prisma.post.create({
                data: { ...data },
            });
            return Some(post);
        } catch (err) {
            return None;
        }
    }

    // FIND ONE WITH COMMENTS
    // talvez criar métodos para cada tipo de busca, caso, busca com comentários e sem comentários
    async findOneWithComments(
        values: { id: string }
        // options?: PostQueryOptions
    ): Promise<Option<Post & { comments: Array<Post> }>> {
        try {
            const post = await prisma.post.findUnique({
                where: {
                    ...values,
                },
                include: {
                    comments: { orderBy: { createdAt: "desc" } },
                },
            });
            return post ? Some(post) : None;
        } catch (err) {
            return None;
        }
    }

    async findOne(
        values: { id: string },
        options: { include: Prisma.PostInclude }
    ): Promise<
        Option<
            | (Post & {
                  user?: User | undefined;
                  _count?: Prisma.PostCountOutputType | undefined;
                  parent?: Post | null | undefined;
                  comments?: Array<Post> | undefined;
              })
            | Post
        >
    > {
        try {
            const post = await prisma.post.findUnique({
                where: {
                    ...values,
                },
                ...options,
            });
            return post ? Some(post) : None;
        } catch (err) {
            return None;
        }
    }

    async find(
        values?: {
            userId?: string | undefined;
            parentId?: string | null;
            published: boolean | undefined;
        },
        options?: PostQueryOptions
    ): Promise<Option<Array<Post>>> {
        try {
            const posts = await prisma.post.findMany({
                where: {
                    ...values,
                },
                ...options,
            });
            return Some(posts);
        } catch (err) {
            return None;
        }
    }
}
