import { Err, Result } from "@sniptt/monads/build";
import { Post } from "@prisma/client";
import { UseCase } from "~~/src/@types/usecase";
import { WebError } from "~~/src/errors/base";

export class CreatePostUsecase implements UseCase<{}, Post> {
    async execute(input: {}): Promise<Result<Post, WebError>> {
        return Err(new WebError("BAD_REQUEST", "AA-A"));
    }
}
