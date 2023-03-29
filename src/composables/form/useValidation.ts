import { Rules } from "~~/src/@types/utils/rules";
import { ValidationError } from "./../../helpers/config/enums";

export const useValidation = <T>(
    input: Record<keyof T, any>,
    rules: Rules<T>
) => {
    const errors = ref({} as Record<keyof T, ValidationError>);

    const valid = computed(() => {
        for (const key in input) {
            if (errors.value[key] !== ValidationError.Sucess) {
                return false;
            }
        }
        return true;
    });

    const validate = () => {
        errors.value = {} as Record<keyof T, ValidationError>;

        for (const field in input) {
            validateField(field);
        }
    };

    const validateField = (field: keyof T) => {
        const value = input[field];
        const fieldRules = rules[field];
        errors.value[field] = ValidationError.Sucess;

        for (const rule of fieldRules) {
            if (rule.validator) {
                try {
                    rule.validator.parse(value);
                } catch (err) {
                    errors.value[field] = rule.message;
                }
            } else {
                if (rule.validation && !rule?.validation(value)) {
                    errors.value[field] = rule.message;
                }
            }
        }

        return errors.value[field] || ValidationError.Sucess;
    };

    const fieldStatus = (field: keyof T) => {
        if (!errors.value[field]) return ValidationError.NotError;
        if (errors.value[field] !== ValidationError.Sucess)
            return ValidationError.Invalid;
        return errors.value[field];
    };

    return { errors, valid, validate, fieldStatus, validateField };
};
