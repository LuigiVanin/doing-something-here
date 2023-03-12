import type { Post, Reaction } from "@prisma/client";
import type { ListPostInput } from "~~/src/dto/post/list.dto";

export type FindPostResult = Array<
    Post & {
        Reactions?: Reaction[];
    }
>;

export type FindPostQuery = {
    parentId?: string | null | undefined;
    userId?: string | undefined;
    published?: boolean | undefined;
    meId?: string | undefined;
};

export type LisPostUseCaseInput = ListPostInput & { userId: string };
