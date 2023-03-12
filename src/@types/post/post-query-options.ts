import { Prisma } from "@prisma/client";

// RefreshTokenOrderByWithRelationInput

export interface PostQueryOptions {
    orderBy?:
        | Prisma.Enumerable<Prisma.PostOrderByWithRelationInput>
        | undefined;
    skip?: number | undefined;
    take?: number | undefined;
}
