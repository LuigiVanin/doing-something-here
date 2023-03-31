import type { Post, Prisma, User } from "@prisma/client";
import { None, Some, Option } from "@sniptt/monads/build";
import type { FindPostResult } from "../@types/post/list";
import type { PostQueryOptions } from "../@types/post/post-query-options";
import prisma from "../db";
import type { Repository } from "./../@types/repository";
import type { CreatePost } from "./../@types/post/create";

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
        values: { id: string; meId?: string | undefined },
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
            published?: boolean | undefined;
            meId?: string | undefined;
        },
        options?: PostQueryOptions
    ): Promise<Option<FindPostResult>> {
        const meId = values?.meId;
        delete values?.meId;
        try {
            const posts = await prisma.post.findMany({
                where: {
                    ...values,
                },
                include: meId
                    ? {
                          Reactions: {
                              where: {
                                  userId: meId,
                              },
                          },
                      }
                    : undefined,
                ...options,
            });
            return Some(posts);
        } catch (err) {
            console.log(err);
            return None;
        }
    }
}
