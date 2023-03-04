<template>
    <!-- Aqui sera a home do app, basicaemnte o feed -->
    <div>Olá {{ auth?.user.email }}</div>
    <input
        type="file"
        name="avatar"
        accept=".png, .jpg, .jpeg"
        @change="handler($event)"
    />
    <img :src="imageUrlPreview || ''" alt="" />
    <button
        v-if="imageUrlPreview && imageFile"
        @click="imageFile && upload(imageFile)"
    >
        Upload Image
    </button>
    <a v-if="url" :href="url">to the image page</a>
    <NuxtLink to="/app/gallery/post">Para zona de criação</NuxtLink>
</template>
<script lang="ts" setup>
definePageMeta({
    middleware: ["auth"],
    layout: "auth-layout",
});

const { auth } = useAuth();
const { handler, imageFile, imageUrlPreview } = useImageInput();
const { upload, url } = useImageUpload();
</script>
<style scoped>
img {
    width: 100px;
}
</style>
