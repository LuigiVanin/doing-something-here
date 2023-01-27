import { Option } from "@sniptt/monads";

export interface Repository<T extends any> {
    create?: (data: T) => Promise<Option<T>>;

    findUnique?: <K extends T>(value: K, options: any) => Promise<Option<T>>;
    // a similar function as above, but K must be a discriminated union of only one field of T
    // example: if T = {id: string, email: string}, then K must be {id: string} or {email: string}
    // findUnique?: <K extends keyof T>(value: Pick<T, K>) => Promise<Option<T>>;
    //

    find?: <K extends T>(value: K, options: any) => Promise<Option<Array<T>>>;

    findOne?: <K extends T>(value: K, options: any) => Promise<Option<T>>;
}
