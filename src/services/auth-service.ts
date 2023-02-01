import { TokenRepository } from "./../repositories/token-repository";
import { v4 as uuid4 } from "uuid";
import jwt from "jsonwebtoken";
import { Err, Ok, Result, Some, Option, None } from "@sniptt/monads/build";
import { RefreshToken, User } from "@prisma/client";
import { SignInResponse } from "../@types/user/signin";
import _ from "lodash";
import { z } from "zod";

interface ServiceError {
    message: string;
    cause: string;
}

interface JWTPayload {
    email: string;
    id: string;
}

export class AuthService {
    private tokenRepository: TokenRepository;

    constructor() {
        this.tokenRepository = new TokenRepository();
    }

    private signJwt(data: JWTPayload) {
        return jwt.sign(data, "super secret key", { expiresIn: "6h" });
    }

    private decodeJwt(jwtToken: string): Option<JWTPayload> {
        try {
            const value = jwt.verify(jwtToken, "super secret key", {});
            const result = z
                .object({
                    email: z.string().email(),
                    id: z.string(),
                })
                .parse(value);

            return Some(result);
        } catch (err) {
            return None;
        }
    }

    private async getRefreshToken(
        data: { userId: string } | { token: string }
    ) {
        return await this.tokenRepository.findOneWithUser(
            { ...data },
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

    private refreshTokenExpired(refreshToken: RefreshToken) {
        const { createdAt } = refreshToken;
        const now = new Date();
        const diff = now.getTime() - createdAt.getTime();
        return diff > 1000 * 60 * 60 * 24 * 7;
    }

    async authorizeUser(
        refreshToken: string,
        jwtToken: string
    ): Promise<Result<SignInResponse, ServiceError>> {
        const rtOpt = await this.getRefreshToken({ token: refreshToken });

        if (rtOpt.isNone()) {
            return Err({
                message: "Invalid refresh token",
                cause: "invalid-refresh-token",
            });
        }
        const rt = rtOpt.unwrap();

        if (this.refreshTokenExpired(rt)) {
            return Err({
                message: "Refresh token expired",
                cause: "refresh-token-expired",
            });
        }

        return this.decodeJwt(jwtToken).match({
            some: (val) => {
                if (val.email !== rt.user.email || val.id !== rt.user.id) {
                    return Err({
                        message: "Invalid JWT",
                        cause: "invalid-jwt",
                    });
                }
                const jwt = this.signJwt({
                    email: rt.user.email,
                    id: rt.user.id,
                });
                return Ok({
                    createdAt: rt.createdAt,
                    refreshToken: rt.token,
                    jwt,
                    user: _.omit(rt.user, ["password"]),
                });
            },
            none: () => Err({ message: "Invalid JWT", cause: "invalid-jwt" }),
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
                    user: _.omit(user, ["password"]),
                }),
            err: (err) => Err(err),
        });
    }
}
