import { Prisma } from "@prisma/client";
export interface TokenQueryOptions {
    orderBy?: Prisma.Enumerable<Prisma.RefreshTokenOrderByWithRelationInput> | undefined;
}
