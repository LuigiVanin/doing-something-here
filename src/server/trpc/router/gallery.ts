import { ListPostUseCase } from "~~/src/useCases/post/list-usecase";
import { CreatePostUsecase } from "./../../../useCases/post/create-usecase";
import { createPostDto } from "./../../../dto/post/create.dto";
import { postListDto } from "~~/src/dto/post/list.dto";
import { protectedProcedure, router } from "../trpc";
import { resolveUseCase } from "~~/src/services/resolve";
import { z } from "zod";

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
    list: protectedProcedure.input(postListDto).query(({ input, ctx }) =>
        resolveUseCase(new ListPostUseCase(), {
            ...input,
            userId: ctx.user.id,
        })
    ),
});
