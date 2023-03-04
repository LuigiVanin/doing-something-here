import { createPostDto } from "./../../../dto/post/create.dto";
import { CreatePostUsecase } from "./../../../useCases/post/create-usecase";
import { z } from "zod";
import { protectedProcedure, router } from "../trpc";
import { resolveUseCase } from "~~/src/services/resolve";
import { ListPostUseCase } from "~~/src/useCases/post/list-usecase";

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
    list: protectedProcedure
        .input(
            z.object({
                parentId: z.string().nullish().optional().default(null),
                userTargetId: z.string().nullish().optional().default(null),
            })
        )
        .query(({ input, ctx }) =>
            resolveUseCase(new ListPostUseCase(), {
                ...input,
                userId: ctx.user.id,
            })
        ),
});
