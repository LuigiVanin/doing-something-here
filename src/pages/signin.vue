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

interface SignInForm {
    email: string;
    password: string;
}

const { mutate: signIn } = $client.auth.signin;

const submitEvent = async (data: SignInForm) => {
    try {
        const result = await signIn(data);

        console.log(result);
    } catch (err) {
        console.log(err);
    }
};
</script>
