import { Option } from "@sniptt/monads";

export interface Repository<T extends any> {
    create?: <K extends T>(data: K) => Promise<Option<T>>;

    findUnique?: <K extends T>(value: K, options: any) => Promise<Option<T>>;

    findOne?: <K extends T>(value: K, options: any) => Promise<Option<T>>;

    find?: <K extends T>(value: K, options: any) => Promise<Option<Array<T>>>;

    update?: <K extends T>(value: K, options: any) => Promise<Option<T>>;

    deleteOne?: <K extends T>(value: K, options: any) => Promise<Option<T>>;
}
