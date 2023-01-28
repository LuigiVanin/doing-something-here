import { UserRepository } from "./../../repositories/user-respositories";
import { Result, Ok } from "@sniptt/monads";
import type { UseCase } from "~~/src/@types/usecase";
import type { ISignUp } from "../../dto/auth/signup.dto";

export class SignUpUseCase implements UseCase<ISignUp, string> {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async execute(userData: ISignUp): Promise<Result<string, string>> {
        return Ok("ok");
    }
}
