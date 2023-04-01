import bcrypt from "bcrypt";
import { Err, Ok, Result } from "@sniptt/monads/build";
import { UnauthorizedError } from "./../../errors/unauthorized-error";
import { UserRepository } from "./../../repositories";
import { SignInResponse } from "./../../@types/user/signin";
import { ISignIn } from "./../../dto/auth/signin.dto";
import { UseCase } from "~~/src/@types/usecase";
import { WebError } from "~~/src/errors/base";
import { NotFoundError } from "~~/src/errors/not-found";
import { AuthService } from "~~/src/services/auth-service";
import { IternalServerError } from "~~/src/errors";

export class SignInUseCase implements UseCase<ISignIn, SignInResponse> {
    private userRepository: UserRepository;
    private authService: AuthService;

    constructor() {
        this.userRepository = new UserRepository();
        this.authService = new AuthService();
    }

    private async passwordMatch(income: string, current: string) {
        return await bcrypt.compare(income, current);
    }

    async execute({
        email,
        password,
    }: ISignIn): Promise<Result<SignInResponse, WebError>> {
        const userOpt = await this.userRepository.findUnique({
            email,
        });

        if (userOpt.isNone()) {
            return Err(
                new NotFoundError(
                    "user-not-found",
                    "There is no user with this email"
                )
            );
        }
        const user = userOpt.unwrap();
        const isAuhtorized = await this.passwordMatch(password, user.password);

        if (!isAuhtorized) {
            return Err(new UnauthorizedError("invalid-password"));
        }

        const signInResult = await this.authService.signUser(user);

        return signInResult.match<Result<SignInResponse, WebError>>({
            ok: (res) => Ok(res),
            err: (err) => Err(new IternalServerError(err.cause, err.message)),
        });
    }
}
