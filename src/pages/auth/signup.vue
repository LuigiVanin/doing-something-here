<template>
    <div class="signup__container">
        <main class="signup__container__box">
            <h4>Sign Up</h4>
            <form @submit="createAccount()">
                <FormMyInput
                    @blur="validateField('name')"
                    name="name"
                    :error="errors.name"
                    type="name"
                    placeholder="inira seu nome..."
                    v-model="signupForm.name"
                >
                    <IconsUser />
                </FormMyInput>
                <FormMyInput
                    @blur="validateField('email')"
                    name="email"
                    :error="errors.email"
                    type="email"
                    placeholder="inira seu email..."
                    v-model="signupForm.email"
                >
                    <IconsEmail />
                </FormMyInput>
                <FormMyInput
                    @blur="validateField('password')"
                    name="password"
                    :error="errors.password"
                    type="senha"
                    placeholder="inira sua senha..."
                    v-model="signupForm.password"
                >
                    <IconsKey />
                </FormMyInput>
                <FormMyInput
                    @blur="validateField('confirmPassword')"
                    name="confirmPassword"
                    :error="errors.confirmPassword"
                    type="senha"
                    placeholder="inira sua senha..."
                    v-model="signupForm.confirmPassword"
                >
                    <IconsKey />
                </FormMyInput>
                <NewButton size="lg" type="shadow" hover-effect="shadow-effect">
                    Sign Up
                </NewButton>

                <p>
                    Já possui uma conta no <b>ImagePoster</b>?
                    <NuxtLink to="/auth/signin">
                        acesse a tela de login
                    </NuxtLink>
                </p>
            </form>
            <!-- <button @click="createAccount()">signup</button> -->
            <div class="progress">
                <span
                    :class="['progress__bar', progress >= 100 ? 'sucess' : '']"
                    :style="`width: ${progress}%`"
                />
            </div>
        </main>
    </div>
</template>
<script lang="ts" setup>
import { z } from "zod";
import { Rules } from "~~/src/@types/utils/rules";
import { useValidation } from "~~/src/composables/form/useValidation";
import { useFormProgress } from "~~/src/composables/form/useFormProgress";
import { useSignup } from "../../composables/api/useSignup";
import { useToast } from "vue-toastification";
export interface SignupForm {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const signupForm = reactive<SignupForm>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
});

const rules: Rules<SignupForm> = {
    name: [
        {
            validator: z.string().min(3).max(50),
            message: "Nome deve ter entre 3 e 50 caracteres",
        },
    ],
    email: [
        {
            validator: z.string().email(),
            message: "Email inválido",
        },
        {
            validator: z.string().min(3).max(100),
            message: "Email deve ter entre 3 e 50 caracteres",
        },
    ],
    password: [
        {
            validator: z.string().min(6).max(50),
            message: "Senha deve ter entre 6 e 50 caracteres",
        },
    ],
    confirmPassword: [
        {
            validator: z.string().min(6).max(50),
            message: "Senha deve ter entre 6 e 50 caracteres",
        },
        {
            validator: z
                .string()
                .refine((value) => value === signupForm.password),
            message: "Senhas não conferem",
        },
    ],
};

const { errors, valid, validateField, validate } = useValidation(
    signupForm,
    rules
);
const { signup, error } = useSignup();
const toast = useToast();
const { progress } = useFormProgress(signupForm, errors);

const submitEvent = (fields: SignupForm) => {
    signup(fields);
};

const createAccount = async () => {
    console.log("Button pressed");

    const result = await signup(signupForm);
    if (error) {
        toast.error("Algo de errado ocorreu");
    }

    console.log(result);
};
</script>
<style lang="scss" scoped>
@import "../../styles/mixins.scss";
@import "../../styles/animations.scss";

.signup__container {
    width: 100%;
    height: 100vh;
    @include flex-center(column);
    // thats a temporary backgorund
    background: url("../../assets/noisy-gradient-background.svg");
    background-size: cover;

    h1 {
        font-style: normal;
        font-weight: 700;
        font-size: 38px;
        line-height: 50px;

        /* identical to box height, or 98% */

        color: #0085ff;
        margin-bottom: 40px;
        user-select: none;
    }

    main.signup__container__box {
        width: 100%;
        max-width: 450px;
        /* height: 100%; */
        max-height: 600px;
        @include flex(column, flex-start, flex-start);
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.15);
        /* border: 1px solid #b8b8b8; */
        padding: 25px;
        padding-bottom: 35px;
        position: relative;
        overflow: hidden;

        gap: 30px;
        @include motion(0.4s);
        h4 {
            font-weight: 600;
            font-size: 38px;
            line-height: 50px;

            /* identical to box height */
            display: flex;
            align-items: flex-end;

            color: #5f5f5f;
        }

        form {
            width: 100%;
            @include flex-center(column);

            width: 100%;
            gap: 25px;

            section.signin__remember-me {
                padding-left: 10px;
                width: 100%;
                @include flex(row, flex-start, center);
                gap: 10px;
                font-weight: 500;
                font-size: 17px;
                line-height: 19px;
                color: #5f5f5f;
                /* margin-bottom: 20px; */
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

        p {
            text-align: center;
            font-size: 17px;
            line-height: 24px;
            color: #5f5f5f;

            a {
                color: var(--main-blue-strong-light);
                font-weight: 600;
            }
        }
    }

    .progress {
        width: 100%;
        background: rgb(219, 219, 219);
        height: 8px;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;

        .progress__bar {
            transition: all 0.2s ease-in-out;
            background: #fad67c;
            height: 100%;
            position: absolute;

            &.sucess {
                background: #42ff8d;
            }
        }
    }
}
</style>
