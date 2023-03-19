<template>
    <div class="input__wrapper">
        <input
            :value="modelValue"
            :type="props.type"
            :name="props.name"
            :id="props.id"
            :class="props.class"
            :placeholder="props.placeholder"
            class="input__inner"
            @input="($event) => emit('update:modelValue', ($event.target as any)?.value)"
            @blur="emit('blur')"
        />
        <span :class="['input__icon', errorStatus]">
            <slot />
        </span>
    </div>
</template>
<script lang="ts" setup>
import { ValidationError } from "~~/src/helpers/config/enums";

interface Props {
    type: string;
    name: string;
    id?: string;
    modelValue: string;
    placeholder: string;
    error?: string;
    class?: string;
}

const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue", "blur"]);

const errorStatus = computed(() => {
    if (props.error === ValidationError.Sucess) {
        return "sucess";
    } else if (props.error === ValidationError.NotError) {
        return "";
    } else if (props.error) {
        return "error";
    }
});
</script>
<style lang="scss" scoped>
.input__wrapper {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border: 2px solid #2596ff;
    border-radius: 8px;
    padding-inline: 10px;
    padding-right: 5px;
    width: 100%;

    input.input__inner {
        border: none;
        outline: none;
        width: 100%;
        font-weight: 400;
        font-size: 18px;
        line-height: 18px;
        height: 30px;
        flex: 1;
    }

    span.input__icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 35px;
        height: 35px;
        border-radius: 8px;
        color: #fff;
        background: linear-gradient(135deg, #eeeeee 50%, #e2e2e2 100%);
        /* margin-inline: 10px; */
        position: relative;

        > svg {
            z-index: 20;
        }
        &::after,
        &::before {
            position: absolute;
            content: "";
            inset: 0;
            border-radius: 8px;
            z-index: 5;
            opacity: 0;
            transition: all 0.3s ease-in-out;
        }
        &.sucess::before {
            opacity: 1;
            background: linear-gradient(
                134.2deg,
                #2ffe82 9.98%,
                #b4ecaf 50.88%,
                #cbf892 91.78%
            );
        }
        &.error::after {
            opacity: 1;
            background: linear-gradient(
                134.27deg,
                #ffb8b8 25.02%,
                #ff0d1b 122.53%
            );
        }
    }
}
</style>
<style lang="scss">
span.input__icon svg {
    z-index: 20;
}
</style>
