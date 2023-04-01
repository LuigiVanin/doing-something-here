import { Prisma } from "@prisma/client";

export interface UserQueryOptions {
    orderBy?:
        | Prisma.Enumerable<Prisma.UserOrderByWithRelationInput>
        | undefined;
}
