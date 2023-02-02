<template>
    <div>Olá {{ auth?.user.email }}</div>
    <button>get photo</button>
</template>
<script lang="ts" setup>
definePageMeta({
    middleware: ["auth"],
    layout: "auth-layout",
});

const { $client } = useNuxtApp();

const { auth } = useAuth();
</script>
