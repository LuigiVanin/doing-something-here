import { Result } from "@sniptt/monads";
import { WebError } from "./../errors/base";

export interface UseCase<Request, Response> {
    execute: (input: Request) => Promise<Result<Response, WebError>>;
}
