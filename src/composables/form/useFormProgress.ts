import { Ref, UnwrapRef } from "vue";
import { ValidationError } from "./../../helpers/config/enums";

export const useFormProgress = (
    formData: UnwrapRef<Record<string, any>>,
    formErrors: Ref<Record<string, any>>
) => {
    const progress = computed(() => {
        const total = Object.keys(formData).length;

        const count = Object.values(formErrors.value).reduce((acc, item) => {
            item === ValidationError.Sucess ? acc++ : acc;
            return acc;
        }, 0);

        return (count / total) * 100;
    });

    return { progress };
};
