import { z } from "zod";
import { protectedProcedure, router } from "../trpc";

export const galleryRouter = router({
    gallery: protectedProcedure
        .input(z.object({}))
        .query(async ({ input, ctx }) => {
            console.log("Ocorrento dentro da rota de galeria!");
            console.log(ctx);
            console.log(process.env.AWS_ACCESS_KEY);

            return {
                papel: true,
            };
        }),
});
