export type PickOptional<T, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K>;

export type SmartOmit<T, K extends keyof T> = Omit<T, K>;

export type Nullable<T> = { [P in keyof T]: T[P] | null };
