<template>
    <input type="email" v-model="formData.email" />
    {{ emailError }}
    <input type="password" v-model="formData.password" />
    {{ passwordError }}
</template>
<script lang="ts" setup>
import { z } from "zod";

const { $client } = useNuxtApp();
const router = useRouter();

interface SignInForm {
    email: string;
    password: string;
}

const formData = reactive<SignInForm>({
    email: "",
    password: "",
});
const { mutate: signIn } = $client.auth.signin;
const { setAuth, auth } = useAuth();
const emailError = computed(() => {
    try {
        z.string().email().parse(formData.email);
        return null;
    } catch (err) {
        return "Email inválido";
    }
});
const passwordError = computed(() => {
    try {
        z.string().min(6).parse(formData.password);
        return null;
    } catch (err) {
        return "Senha inválida";
    }
});

const submitEvent = async (data: SignInForm) => {
    try {
        const result = await signIn(data);

        setAuth({
            createdAt: result.createdAt,
            jwt: result.jwt,
            refreshToken: result.refreshToken,
            user: result.user,
        });

        localStorage.setItem("access-token", auth.value?.jwt || "");
        localStorage.setItem("refresh-token", auth.value?.refreshToken || "");
        router.push("/app");
    } catch (err) {
        console.log(err);
    }
};
</script>
