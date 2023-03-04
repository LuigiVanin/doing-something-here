import { createPostDto } from "./../../../dto/post/create.dto";
import { CreatePostUsecase } from "./../../../useCases/post/create-usecase";
import { z } from "zod";
import { protectedProcedure, router } from "../trpc";
import { resolveUseCase } from "~~/src/services/resolve";

export const galleryRouter = router({
    gallery: protectedProcedure
        .input(z.object({}))
        .query(async ({ input, ctx }) => {
            return {
                papel: true,
            };
        }),
    post: protectedProcedure.input(createPostDto).mutation(({ input, ctx }) =>
        resolveUseCase(new CreatePostUsecase(), {
            ...input,
            userId: ctx.user.id,
        })
    ),
});
