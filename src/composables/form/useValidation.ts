interface Rule {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    validate?: (value: any) => boolean;
    message?: string;
}

type Rules<T> = Record<keyof T, Rule>;

const useValidation = <T>(input: Record<string, any>, rules: Rules<T>) => {
    const valid = ref(false);
    const errors = ref<Record<keyof T, string | undefined>>(
        {} as Record<keyof T, string>
    );
    // function that retiurn a Record<keyof T, string | undefined> with the error messages in each field

    return { errors, valid };
};
