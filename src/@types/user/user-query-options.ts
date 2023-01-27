import { Prisma } from "@prisma/client";

interface UserQueryOptions {
    orderBy?:
        | Prisma.Enumerable<Prisma.UserOrderByWithRelationInput>
        | undefined;
}
