export type PickOptional<T, K extends keyof T> = Partial<Pick<T, K>> &
    Omit<T, K>;

export type SmartOmit<T, K extends keyof T> = Omit<T, K>;
