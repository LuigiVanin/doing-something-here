import { ValidationError } from "./../../helpers/config/enums";

interface ZodGeneric<T> {
    parse: () => T;
}

type Rule<T = string> =
    | {
          validator: ZodGeneric<T>;
          message: string;
      }
    | {
          validation: (value: T) => boolean;
          message: string;
      };

type Rules<T> = Record<keyof T, Rule>;

const useValidation = <T>(input: Record<string, any>, rules: Rules<T>) => {
    const valid = ref(false);
    const errors = ref<Record<keyof T, ValidationError>>(
        {} as Record<keyof T, ValidationError>
    );
    // function that retiurn a Record<keyof T, string | undefined> with the error messages in each field

    return { errors, valid };
};
