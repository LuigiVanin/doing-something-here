declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DATABASE_URL: string;
            JWT_SECRET_KEY: string;
            AWS_ACCESS_KEY: string;
            AWS_SECRET_KEY: string;
            AWS_IAM_USERNAME: string;
        }
    }
}

export {};
