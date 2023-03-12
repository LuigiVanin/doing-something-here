import { PostRepository } from "./../../repositories/post-repositories";
import { Err, Ok, Result } from "@sniptt/monads/build";
import { Post } from "@prisma/client";
import { UseCase } from "~~/src/@types/usecase";
import { WebError } from "~~/src/errors/base";
import { SmartOmit } from "~~/src/@types/utils/transform";
import { z } from "zod";
import { IternalServerError } from "~~/src/errors";
import { CreatePost } from "~~/src/@types/post/create";

export class CreatePostUsecase implements UseCase<CreatePost, Post> {
    private postRepository: PostRepository;

    constructor() {
        this.postRepository = new PostRepository();
    }

    async execute(input: CreatePost): Promise<Result<Post, WebError>> {
        const post = await this.postRepository.create(input);
        console.log(post);

        return post.match<Result<Post, WebError>>({
            some: (post) => {
                return Ok(post);
            },
            none: () => {
                return Err(new IternalServerError());
            },
        });
    }
}
