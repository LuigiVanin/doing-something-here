import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export class S3ClientSingleton {
    private static _instance: S3ClientSingleton;
    public _client: S3Client;

    private constructor() {
        this._client = new S3Client({
            region: "sa-east-1",
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY,
                secretAccessKey: process.env.AWS_SECRET_KEY,
            },
        });
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    public async createPresignedUrl(fileName: string, fileExtension: string) {
        const command = new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `${fileName}.${fileExtension}`,
        });
        const url = await getSignedUrl(this._client, command, {
            expiresIn: 3600,
        });

        return url;
    }
}
