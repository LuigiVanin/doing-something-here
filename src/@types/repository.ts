import { Option } from "@sniptt/monads";

export interface Repository<T extends any> {
    create: (data: T) => Promise<Option<T>>;

    findOne: (value: any) => Promise<Option<T>>;
}
