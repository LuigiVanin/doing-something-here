<template>
    <div>Olá {{ auth?.user.email }}</div>
    <button @click="getPhotos()">get photo</button>
</template>
<script lang="ts" setup>
definePageMeta({
    middleware: ["auth"],
    layout: "auth-layout",
});

const { $client } = useNuxtApp();
const { auth } = useAuth();

const getPhotos = async () => {
    const result = await $client.gallery.gallery.query({});
    console.log(result);
};
</script>
