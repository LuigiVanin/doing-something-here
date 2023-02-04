<template lang="">
    <FormKit type="form" @submit="submitEvent($event)">
        <FormKit
            type="email"
            label="Email"
            name="email"
            placeholder="nanna"
            :validation="[['required'], ['length', 3, 150], ['email']]"
            value="luisfvanin3@gmail.com"
        />
        <FormKit
            type="password"
            name="password"
            label="Password"
            validation="required"
            validation-visibility="live"
            value="senha123"
        />
        <!-- <button @click="createAccount()">signup</button> -->
    </FormKit>
</template>
<script lang="ts" setup>
const { $client } = useNuxtApp();
const router = useRouter();

interface SignInForm {
    email: string;
    password: string;
}

const { mutate: signIn } = $client.auth.signin;
const { setAuth, auth } = useAuth();

const submitEvent = async (data: SignInForm) => {
    try {
        const result = await signIn(data);

        setAuth({
            createdAt: new Date(result.createdAt),
            jwt: result.jwt,
            refreshToken: result.refreshToken,
            user: result.user,
        });

        console.log(result);
        console.log(auth.value);
        localStorage.setItem("access-token", auth.value?.jwt || "");
        localStorage.setItem("refresh-token", auth.value?.refreshToken || "");
        router.push("/app");
    } catch (err) {
        console.log(err);
    }
};
</script>
