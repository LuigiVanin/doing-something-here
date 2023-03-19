<template>
    <div class="signin__container">
        <main class="signin__container__box">
            <h1>ImagePoster</h1>

            <h4>Sign In</h4>
            <form @submit.prevent="submitEvent(formData)">
                <FormMyInput
                    name="email"
                    type="email"
                    v-model="formData.email"
                    placeholder="inira seu email..."
                    :error="errors.email"
                    @blur="validateEmail()"
                >
                    <svg
                        width="20"
                        height="14"
                        viewBox="0 0 20 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M2.875 1.75C2.54844 1.75 2.28125 2.0125 2.28125 2.33333V3.13906L8.68262 8.30156C9.45078 8.92135 10.5529 8.92135 11.3211 8.30156L17.7188 3.13906V2.33333C17.7188 2.0125 17.4516 1.75 17.125 1.75H2.875ZM2.28125 5.40312V11.6667C2.28125 11.9875 2.54844 12.25 2.875 12.25H17.125C17.4516 12.25 17.7188 11.9875 17.7188 11.6667V5.40312L12.4492 9.65417C11.0242 10.8026 8.97207 10.8026 7.55078 9.65417L2.28125 5.40312ZM0.5 2.33333C0.5 1.04635 1.56504 0 2.875 0H17.125C18.435 0 19.5 1.04635 19.5 2.33333V11.6667C19.5 12.9536 18.435 14 17.125 14H2.875C1.56504 14 0.5 12.9536 0.5 11.6667V2.33333Z"
                            fill="white"
                        />
                    </svg>
                </FormMyInput>
                <FormMyInput
                    name="password"
                    type="senha"
                    v-model="formData.password"
                    placeholder="inira sua senha..."
                    :error="errors.password"
                    @blur="validatePassword()"
                >
                    <svg
                        width="20"
                        height="14"
                        viewBox="0 0 20 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M2.875 1.75C2.54844 1.75 2.28125 2.0125 2.28125 2.33333V3.13906L8.68262 8.30156C9.45078 8.92135 10.5529 8.92135 11.3211 8.30156L17.7188 3.13906V2.33333C17.7188 2.0125 17.4516 1.75 17.125 1.75H2.875ZM2.28125 5.40312V11.6667C2.28125 11.9875 2.54844 12.25 2.875 12.25H17.125C17.4516 12.25 17.7188 11.9875 17.7188 11.6667V5.40312L12.4492 9.65417C11.0242 10.8026 8.97207 10.8026 7.55078 9.65417L2.28125 5.40312ZM0.5 2.33333C0.5 1.04635 1.56504 0 2.875 0H17.125C18.435 0 19.5 1.04635 19.5 2.33333V11.6667C19.5 12.9536 18.435 14 17.125 14H2.875C1.56504 14 0.5 12.9536 0.5 11.6667V2.33333Z"
                            fill="white"
                        />
                    </svg>
                </FormMyInput>

                <section class="signin__remember-me">
                    <span
                        :class="[
                            'signin__remember-me__toggle',
                            remeberMe ? 'active' : '',
                        ]"
                        @click="remeberMe = !remeberMe"
                    />
                    Lembrar a minha senha
                </section>

                <!-- TODO: I need to add a shadow effect -->
                <NewButton
                    :disabled="!isValid"
                    size="lg"
                    type="main"
                    hover-effect="shadow-effect"
                >
                    Sign In
                </NewButton>
            </form>
        </main>
    </div>
</template>
<script lang="ts" setup>
import { z } from "zod";
import { useSignin } from "~~/src/composables/api/useSignin";
import { ValidationError } from "~~/src/helpers/config/enums";

const { $client } = useNuxtApp();

interface SignInForm {
    email: string;
    password: string;
}

const formData = reactive<SignInForm>({
    email: "",
    password: "",
});
const errors = reactive<SignInForm>({
    email: ValidationError.NotError,
    password: ValidationError.NotError,
});

const remeberMe = ref(false);

const validateEmail = () => {
    try {
        z.string().email().parse(formData.email);
        errors.email = ValidationError.Sucess;
    } catch (err) {
        errors.email = "Email inválido";
    }
};
const validatePassword = () => {
    try {
        z.string().min(6).parse(formData.password);
        errors.password = ValidationError.Sucess;
    } catch (err) {
        errors.password = "Senha inválida";
    }
};
const isValid = computed(() => {
    return (
        errors.email === ValidationError.Sucess &&
        errors.password === ValidationError.Sucess
    );
});

const { signin, loading, error } = useSignin();

const submitEvent = async (data: SignInForm) => {
    try {
        validateEmail();
        validatePassword();
        if (!isValid.value) {
            return;
        }
        await signin(data);
    } catch (err) {
        console.log(err);
    }
};
</script>
<style lang="scss" scoped>
.signin__container {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(192, 192, 192);

    background: linear-gradient(
        116.07deg,
        #2596ff 0.38%,
        #7dc1ff 13.03%,
        #e9ecff 37.36%,
        #ead9ff 56.72%,
        #ffb0d0 75.32%,
        #f44262 103.09%
    );
    /* background: url("../../assets/noisy-gradient-background.png"); */
    background-size: cover;

    main.signin__container__box {
        width: 100%;
        max-width: 500px;
        height: 100%;
        max-height: 600px;
        display: flex;
        justify-content: flex-start;
        align-items: start;
        flex-direction: column;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.15);
        border: 1px solid #b8b8b8;
        padding: 20px;
        gap: 30px;
        h1 {
            font-style: normal;
            font-weight: 700;
            font-size: 38px;
            line-height: 41px;

            /* identical to box height, or 98% */

            color: #0085ff;
        }

        h4 {
            font-weight: 600;
            font-size: 32px;
            line-height: 57px;

            /* identical to box height */
            display: flex;
            align-items: flex-end;

            color: #000000;
        }

        form {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            gap: 20px;

            section.signin__remember-me {
                padding-left: 10px;
                width: 100%;
                display: flex;
                align-items: start;
                justify-content: start;
                gap: 10px;
                font-weight: 500;
                font-size: 16px;
                line-height: 19px;
                color: #000000;
                margin-bottom: 20px;
                span.signin__remember-me__toggle {
                    width: 20px;
                    height: 20px;
                    border: 1px solid var(--border-gray-light);
                    border-radius: 5px;
                    cursor: pointer;
                    position: relative;

                    &.active {
                        border: 1px solid #2ffe82;
                    }

                    &::after {
                        position: absolute;
                        content: "";
                        inset: 0;
                        opacity: 0;
                        transition: all 0.2s ease-in-out;
                        background: linear-gradient(
                            134.2deg,
                            #2ffe82 9.98%,
                            #b4ecaf 50.88%,
                            #cbf892 91.78%
                        );
                    }
                    &.active::after {
                        opacity: 1;
                    }
                }
            }
        }
    }
}
</style>
