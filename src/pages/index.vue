<template>
    <FormKit type="group">
        <FormKit
            type="text"
            label="Name"
            placeholder="nanna"
            :validation="[['required'], ['length', 3, 10]]"
        />
        <FormKit
            type="email"
            label="Email"
            placeholder="nanna"
            :validation="[['required'], ['length', 3, 10], ['email']]"
        />
        <FormKit
            type="password"
            name="password"
            label="Password"
            validation="required"
            validation-visibility="live"
        />
        <FormKit
            type="password"
            name="password_confirm"
            label="Confirm password"
            validation="required|confirm"
            validation-visibility="live"
            validation-label="Confirmation"
        />
    </FormKit>
    <button @click="createAccount()">signup</button>
</template>
<script lang="ts" setup>
const { $client } = useNuxtApp();

const { mutate: signup } = $client.auth.signup;

const createAccount = async () => {
    console.log("Button pressed");

    const result = await signup({
        email: "lll@gmail.com",
        name: "Luis Felipe Vanun",
        password: "1234",
        password2: "1234",
    });

    console.log(result);
};
</script>
