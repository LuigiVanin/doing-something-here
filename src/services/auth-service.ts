import { TokenRepository } from "./../repositories/token-repository";
import { v4 as uuid4 } from "uuid";
import * as jwt from "jsonwebtoken";
import { Err, Ok, Result } from "@sniptt/monads/build";
import { RefreshToken, User } from "@prisma/client";
import { SignInResponse } from "../@types/user/signin";

interface ServiceError {
    message: string;
    cause: string;
}

export class AuthService {
    private tokenRepository: TokenRepository;

    constructor() {
        this.tokenRepository = new TokenRepository();
    }

    private signJwt(data: { email: string; id: string }) {
        return jwt.sign(data, "super secret key", { expiresIn: "6h" });
    }

    private async getRefreshToken(userId: string) {
        return await this.tokenRepository.findOne(
            { userId },
            { orderBy: { createdAt: "desc" } }
        );
    }

    private async createRefreshToken(
        userId: string
    ): Promise<Result<RefreshToken, ServiceError>> {
        const token = uuid4();
        const createOpt = await this.tokenRepository.create({ userId, token });

        return createOpt.match<Result<RefreshToken, ServiceError>>({
            some: (rt) => Ok(rt),
            none: () =>
                Err({
                    message: "Could not create refresh token",
                    cause: "could-not-create-token",
                }),
        });
    }

    async signUser(user: User): Promise<Result<SignInResponse, ServiceError>> {
        const { email, id } = user;
        const jwtToken = this.signJwt({ email, id });

        const tfResult = await this.createRefreshToken(id);

        return tfResult.match<Result<SignInResponse, ServiceError>>({
            ok: (rt) =>
                Ok({
                    createdAt: rt.createdAt,
                    refreshToken: rt.token,
                    jwt: jwtToken,
                    user,
                }),
            err: (err) => Err(err),
        });
    }
}
