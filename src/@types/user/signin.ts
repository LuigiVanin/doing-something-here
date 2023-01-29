import { User } from "@prisma/client";

export interface SignInResponse {
    jwt: string;
    refreshToken: string;
    createdAt: Date;

    user: User;
}
