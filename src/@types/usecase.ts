import { Result } from "@sniptt/monads";

export interface UseCase<Request, Response> {
    execute: (input: Request) => Promise<Result<Response, any>>;
}
