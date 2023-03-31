import { User } from "@prisma/client";
import { Result, Ok, Err } from "@sniptt/monads";
import bcrypt from "bcrypt";
import type { ISignUp } from "../../dto/auth/signup.dto";
import { WebError } from "./../../errors/base";
import { UserRepository } from "./../../repositories/user-respositories";
import { BadRequestError } from "~~/src/errors/bad-request";
import type { UseCase } from "~~/src/@types/usecase";
import { ConflictError } from "~~/src/errors/conflict-error";

export class SignUpUseCase implements UseCase<ISignUp, User> {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async execute(userData: ISignUp): Promise<Result<User, WebError>> {
        const userOpt = await this.userRepository.findUnique({
            email: userData.email,
        });

        if (userOpt.isSome()) {
            return Err(new ConflictError("User already exists", "user-already-exists"));
        }

        return (
            await this.userRepository.create({
                email: userData.email,
                name: userData.name,
                password: await bcrypt.hash(userData.password, 10),
            })
        ).match<Result<User, WebError>>({
            some: (val) => Ok(val),
            none: () => {
                return Err(new BadRequestError("Problem creating user"));
            },
        });
    }
}
