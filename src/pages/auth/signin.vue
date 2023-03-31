<template>
    <div class="signin__container">
        <h1>ImagePoster</h1>
        <main class="signin__container__box">
            <h4>Sign In</h4>
            <form @submit.prevent="submitEvent(formData)">
                <FormMyInput
                    v-model="formData.email"
                    name="email"
                    type="email"
                    placeholder="inira seu email..."
                    :error="formErrors.email"
                    @blur="validateField('email')"
                >
                    <IconsEmail />
                </FormMyInput>
                <FormMyInput
                    v-model="formData.password"
                    name="password"
                    type="senha"
                    placeholder="inira sua senha..."
                    :error="formErrors.password"
                    @blur="validateField('password')"
                >
                    <IconsKey />
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
                <NewButton size="lg" type="shadow" hover-effect="shadow-effect">
                    Sign In
                </NewButton>
            </form>
            <p>
                ainda não possui uma conta?
                <NuxtLink to="/auth/signup">
                    acesse a tela de cadastro
                </NuxtLink>
            </p>
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
import { useSignin } from "~~/src/composables/api/useSignin";
import { useFormProgress } from "~~/src/composables/form/useFormProgress";
import { useValidation } from "~~/src/composables/form/useValidation";
import { signinRules } from "~~/src/helpers/config/rules";

interface SignInForm {
    email: string;
    password: string;
}

const formData = reactive<SignInForm>({
    email: "",
    password: "",
});

const {
    validate,
    errors: formErrors,
    valid,
    validateField,
} = useValidation(formData, signinRules);

const remeberMe = ref(false);

const { signin } = useSignin();
const { progress } = useFormProgress(formData, formErrors);

const submitEvent = async (data: SignInForm) => {
    try {
        validate();
        if (!valid.value) {
            return;
        }
        await signin(data);
    } catch (err) {
        // TODO: add error treatment
        console.log(err);
    }
};
</script>
<style lang="scss" scoped>
@import "../../styles/mixins.scss";
@import "../../styles/animations.scss";

.signin__container {
    width: 100%;
    height: 100vh;
    @include flex-center(column);
    // thats a temporary backgorund
    background: url("../../assets/noisy-gradient-background.svg");
    background-size: cover;
    overflow: hidden;

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

    main.signin__container__box {
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
