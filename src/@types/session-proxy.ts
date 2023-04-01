type Nullable<T> = { [P in keyof T]: T[P] | null };

export interface StorageProxy<T> {
    getItem(): Nullable<T>;
    setItem(value: T): void;
}
