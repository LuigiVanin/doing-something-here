import { ListObjectsCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Err, Result, Ok } from "@sniptt/monads/build";
import { ServiceError } from "../@types/error";
import { S3ClientSingleton as S3Client } from "../helpers/s3-client-singleton";

export class AwsService {
    private client: S3Client;

    constructor() {
        console.log(process.env.AWS_ACCESS_KEY, process.env.AWS_SECRET_KEY);
        console.log(process.env.AWS_BUCKET_NAME);
        this.client = S3Client.Instance;
    }

    public async createPresignedUrl(
        fileName: string,
        fileExtension: string
    ): Promise<Result<string, ServiceError>> {
        try {
            const url = await this.client.createPresignedUrl(
                fileName,
                fileExtension
            );
            return Ok(url);
        } catch (err) {
            return Err({
                message: "Could not create presigned url",
                cause: "could-not-create-presigned-url",
            });
        }
    }
}
