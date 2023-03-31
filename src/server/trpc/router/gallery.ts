import { z } from "zod";
import { protectedProcedure, router } from "../trpc";
import { CreatePostUsecase } from "./../../../useCases/post/create-usecase";
import { createPostDto } from "./../../../dto/post/create.dto";
import { ListPostUseCase } from "~~/src/useCases/post/list-usecase";
import { postListDto } from "~~/src/dto/post/list.dto";
import { resolveUseCase } from "~~/src/services/resolve";

export const galleryRouter = router({
    gallery: protectedProcedure.input(z.object({})).query(async ({}) => {
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
