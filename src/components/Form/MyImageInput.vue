<template lang="">
    <div :class="['input__wrapper']">
        <label for="fileInput">
            <div
                :class="['input__avatar', imageUrlPreview && 'active']"
                :style="
                    imageUrlPreview && `background: url(${imageUrlPreview})`
                "
            >
                <span class="input__avatar__backdrop" />
                <svg
                    v-if="!imageUrlPreview"
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="#ffffff"
                    viewBox="0 0 256 256"
                >
                    <path
                        d="M228,152v56a20,20,0,0,1-20,20H48a20,20,0,0,1-20-20V152a12,12,0,0,1,24,0v52H204V152a12,12,0,0,1,24,0ZM96.49,88.49,116,69v83a12,12,0,0,0,24,0V69l19.51,19.52a12,12,0,0,0,17-17l-40-40a12,12,0,0,0-17,0l-40,40a12,12,0,0,0,17,17Z"
                    />
                </svg>
            </div>
            <div class="input__text">
                <p>
                    {{
                        !imageFile?.name
                            ? "Insira sua foto de avatar"
                            : imageFile?.name
                    }}
                </p>
                <div v-if="!imageUrlPreview" class="button">
                    upload
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="17"
                        fill="#ffffff"
                        viewBox="0 0 256 256"
                    >
                        <path
                            d="M228,152v56a20,20,0,0,1-20,20H48a20,20,0,0,1-20-20V152a12,12,0,0,1,24,0v52H204V152a12,12,0,0,1,24,0ZM96.49,88.49,116,69v83a12,12,0,0,0,24,0V69l19.51,19.52a12,12,0,0,0,17-17l-40-40a12,12,0,0,0-17,0l-40,40a12,12,0,0,0,17,17Z"
                        />
                    </svg>
                </div>
                <button v-else @click.prevent="">
                    remover
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="17"
                        fill="#ffffff"
                        viewBox="0 0 256 256"
                    >
                        <path
                            d="M216,48H40a12,12,0,0,0,0,24h4V208a20,20,0,0,0,20,20H192a20,20,0,0,0,20-20V72h4a12,12,0,0,0,0-24ZM188,204H68V72H188ZM76,20A12,12,0,0,1,88,8h80a12,12,0,0,1,0,24H88A12,12,0,0,1,76,20Z"
                        />
                    </svg>
                </button>
            </div>
        </label>
        <input
            id="fileInput"
            name="fileInput"
            type="file"
            style="display: none"
            @change="handleFileChange"
        />
        <span :class="['input__icon']">
            <IconsImage />
        </span>
    </div>
</template>
<script lang="ts" setup>
import { emit } from "process";
import { useImageInput } from "~/composables/useImageInput";

const { handler, imageFile, imageUrlPreview } = useImageInput();
const emit = defineEmits(["change:file-upload"]);

const handleFileChange = (e: Event) => {
    handler(e);
    console.log(imageUrlPreview.value, imageFile.value);
    emit("change:file-upload", imageFile.value);
};
</script>
<style lang="scss" scoped>
@import "../../styles/mixins.scss";

.input__wrapper {
    display: flex;
    align-items: start-flex;
    padding-block: 7px;
    height: 80px;
    justify-content: flex-start;
    border: 1px solid #88939e;
    border-radius: 8px;
    padding-inline: 10px;
    padding-right: 5px;
    width: 100%;
    transition: all 0.3s ease-in-out;

    label {
        flex: 1;
        @include flex(row, start-flex, center);
        gap: 10px;
        cursor: pointer;
        font-size: 15px;
        color: gray;

        .input__avatar {
            height: 60px;
            width: 60px;
            background: white;
            border-radius: 5px;
            background: linear-gradient(135deg, #e2e2e2 40%, #c2c2c2 120%);
            position: relative;
            background-position: center !important;
            background-size: cover !important;

            @include flex-center();
            &.active {
                box-shadow: 0px 0px 0px 3px #2ffe82;
            }
        }

        .button {
            background: #188cf8;
            margin-top: 10px;
            border-radius: 4px;
            width: 100px;
            padding-block: 6px;
            color: #fff;
            font-size: 14px;
            font-weight: 500;
            @include flex-center;
            &:hover {
                background: #0085ff;
            }
        }
    }

    &.active {
        box-shadow: 0px 0px 5px 1px #2596ff3a;
        border: 1px solid #188cf8;
    }

    input.input__inner {
        border: none;
        outline: none;
        width: 100%;
        font-weight: 400;
        font-size: 16px;
        line-height: 20px;
        height: 30px;
        flex: 1;
        background: transparent;
    }

    span.input__icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 35px;
        height: 35px;
        border-radius: 8px;
        color: #fff;
        background: linear-gradient(135deg, #e2e2e2 40%, #c2c2c2 120%);
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
