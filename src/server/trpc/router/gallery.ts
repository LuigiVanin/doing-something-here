import { z } from "zod";
import { protectedProcedure, router } from "../trpc";

export const galleryRouter = router({
    gallery: protectedProcedure
        .input(z.object({}))
        .query(async ({ input, ctx }) => {
            console.log(ctx);

            return {
                papel: true,
            };
        }),
});
