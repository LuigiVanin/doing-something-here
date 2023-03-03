import { PostQueryOptions } from "./../@types/post/post-query-options";
import { None, Some } from "@sniptt/monads/build";
import { Repository } from "./../@types/repository";
import { Post, Prisma } from "@prisma/client";
import { Option } from "@sniptt/monads/build";
import prisma from "../db";
import { SmartOmit } from "../@types/utils/transform";

type CreatePost = SmartOmit<Post, "id" | "createdAt" | "updatedAt">;

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
}
