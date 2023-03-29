export interface ZodGeneric<T> {
    parse: (value: T) => T;
}

export type Rule<T = string> = {
    validator?: ZodGeneric<T>;

    message: string;
} & {
    validation?: (value: T) => boolean;

    message: string;
};

export type Rules<T> = Record<keyof T, Array<Rule>>;
