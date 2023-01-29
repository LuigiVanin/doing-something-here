<template>
    <NuxtLink to="/signin">Signin</NuxtLink>
    <FormKit type="form" @submit="submitEvent($event)">
        <FormKit
            type="text"
            label="Name"
            name="name"
            placeholder="nanna"
            :validation="[['required'], ['length', 3, 150]]"
            value="Luis Felipe Vanin"
        />
        <FormKit
            type="email"
            label="Email"
            name="email"
            placeholder="nanna"
            :validation="[['required'], ['length', 3, 150], ['email']]"
            value="luisfvanin@gmail.com"
        />
        <FormKit
            type="password"
            name="password"
            label="Password"
            validation="required"
            validation-visibility="live"
            value="senha123"
        />
        <FormKit
            type="password"
            name="password_confirm"
            label="Confirm password"
            validation="required|confirm"
            validation-visibility="live"
            validation-label="Confirmation"
            value="senha123"
        />
        <!-- <button @click="createAccount()">signup</button> -->
    </FormKit>
</template>
<script lang="ts" setup>
export interface SignupForm {
    name: string;
    email: string;
    password: string;
    password_confirm: string;
}

const { $client } = useNuxtApp();

const { mutate: signup } = $client.auth.signup;

const submitEvent = (fields: SignupForm) => {
    console.log(fields);

    signup({
        email: fields.email,
        name: fields.name,
        password: fields.password,
        password2: fields.password_confirm,
    });
};

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
