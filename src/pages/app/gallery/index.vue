<template lang="">
    <div>
        Add photo to your galary!
        <input
            type="file"
            name="avatar"
            accept=".png, .jpg, .jpeg"
            @change="getImage"
        />
        <img :src="imagePreview || ''" alt="" />

        <button v-if="imagePreview" @click="upload()">Upload Image</button>
    </div>
</template>
<script lang="ts" setup>
import { Ref, ref } from "vue";

definePageMeta({
    middleware: ["auth"],
    layout: "auth-layout",
});

const { $client } = useNuxtApp();
const { auth } = useAuth();
const image = ref<any>(null);
const imagePreview = ref(null) as Ref<string | null>;
const presignedUrl = ref(null) as Ref<string | null>;

const getImage = (event: any) => {
    console.log(event);
    image.value = event.target.files[0];
    imagePreview.value = URL.createObjectURL(image.value);
    console.log(image.value);
};

const upload = async () => {
    try {
        const ext = image.value.name.split(".").pop();
        const data = await $client.s3.postSignedUrl.query({
            fileExt: ext,
        });
        if (!data) return;
        const result = await fetch(data.url, {
            method: "PUT",
            body: image.value,
        });
        console.log(result);
    } catch (error) {
        console.log(error);
    }
};
</script>
