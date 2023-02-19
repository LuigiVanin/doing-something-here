<template>
    <div>Olá {{ auth?.user.email }}</div>
    <input
        type="file"
        name="avatar"
        accept=".png, .jpg, .jpeg"
        @change="previewImage"
    />
    <button @click="getPhotos()">get photo</button>
    <img :src="imagePreview || ''" alt="" />
    <button v-if="presignedUrl" @click="upload()">Upload Image</button>
    <NuxtLink to="/app/gallery">Para zona de criação</NuxtLink>
</template>
<script lang="ts" setup>
import { Ref } from "vue";

definePageMeta({
    middleware: ["auth"],
    layout: "auth-layout",
});

const { $client } = useNuxtApp();
const { auth } = useAuth();
const image = ref<any>(null);
const imagePreview = ref(null) as Ref<string | null>;
const presignedUrl = ref(null) as Ref<string | null>;

const getPhotos = async () => {
    const result = await $client.s3.postSignedUrl.query({
        fileExt: ".jpg",
    });
    presignedUrl.value = result.url;
    console.log(result);
};

const previewImage = (event: any) => {
    console.log(event);
    image.value = event.target.files[0];
    imagePreview.value = URL.createObjectURL(image.value);
};

const upload = async () => {
    if (!presignedUrl.value) return;
    fetch(presignedUrl.value, {
        method: "PUT",
        body: image.value,
    })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
};
</script>
<style scoped>
img {
    width: 100px;
}
</style>
