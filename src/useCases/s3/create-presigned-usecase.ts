import { Err, Ok, Result } from "@sniptt/monads/build";
import { v4 as uuid } from "uuid";
import { PresignedUrlInput } from "./../../dto/s3/presigned-url.dto";
import { UseCase } from "~~/src/@types/usecase";
import { WebError } from "~~/src/errors/base";
import { IternalServerError } from "~~/src/errors";
import { AwsService } from "~~/src/services/aws-service";

interface PresignedUrlResponse {
    url: string;
    uuid: string;
}

export class CreatePresignedUrlUseCase
    implements UseCase<PresignedUrlInput, PresignedUrlResponse>
{
    private awsService: AwsService;

    constructor() {
        this.awsService = new AwsService();
    }

    async execute(
        input: PresignedUrlInput
    ): Promise<Result<PresignedUrlResponse, WebError>> {
        const imageTitle = uuid();
        const result = await this.awsService.createPresignedUrl(
            imageTitle,
            input.fileExt
        );

        return result.match<Result<PresignedUrlResponse, WebError>>({
            ok: (url) => {
                console.log("AWS URL: ", url);
                return Ok({ url, uuid: imageTitle });
            },
            err: (_err) => {
                return Err(
                    new IternalServerError(
                        "it was not possible to create url",
                        "could-not-create-url"
                    )
                );
            },
        });
    }
}
