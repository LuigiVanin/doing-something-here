<template>
    <div class="column">
        <NuxtLink to="/auth/signin">Faça Login</NuxtLink>
        <NuxtLink to="/auth/signup">Faça Signup</NuxtLink>
        <NuxtLink to="/app">Acess App</NuxtLink>
    </div>
</template>
<script lang="ts" setup>
import { useToast } from "vue-toastification";

const toast = useToast();
if (process.client) {
    toast.error("aaaaaa");
}
</script>
<style lang="scss">
.column {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    gap: 10px;

    /* button {
        background: blue;
    } */
}
</style>
