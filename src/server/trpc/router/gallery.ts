import { z } from "zod";
import { protectedProcedure, router } from "../trpc";
import { AwsService } from "~~/src/services/aws-service";

export const galleryRouter = router({
    gallery: protectedProcedure
        .input(z.object({}))
        .query(async ({ input, ctx }) => {
            console.log("Ocorrento dentro da rota de galeria!");
            console.log(ctx);
            console.log(process.env.AWS_ACCESS_KEY);
            const aws = new AwsService();
            const url = aws.createPresignedUrl("teste", "png");
            console.log(url);
            return {
                papel: true,
            };
        }),
});
