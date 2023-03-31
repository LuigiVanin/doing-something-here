import { PresignedUrlDto } from "./../../../dto/s3/presigned-url.dto";
import { protectedProcedure, router } from "./../trpc";
import { resolveUseCase } from "~~/src/services/resolve";
import { CreatePresignedUrlUseCase } from "~~/src/useCases/s3/create-presigned-usecase";

export const s3ManagerRouter = router({
    postSignedUrl: protectedProcedure
        .input(PresignedUrlDto)
        .query(async ({ input }) =>
            resolveUseCase(new CreatePresignedUrlUseCase(), input)
        ),
});
