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
    <div class="">
        titulo
        <input type="text" v-model="title" />
    </div>
    <div class="">
        description
        <input type="text" v-model="description" />
    </div>
    <button @click="submitPost()">Fazer submissao de post</button>
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
const title = ref("");
const description = ref("");
const imageUrl = ref<string | undefined>();

const post = $client.gallery.post.mutate;

const getImage = (event: any) => {
    image.value = event.target.files[0];
    imagePreview.value = URL.createObjectURL(image.value);
};

const submitPost = async () => {
    console.log("Mandando imaeg");
    const x = await post({
        title: title.value,
        body: description.value,
        image: imageUrl.value,
    });
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
        imageUrl.value = `https://nuxt-project-images.s3.sa-east-1.amazonaws.com/${data.uuid}.${ext}`;
        console.log(image.value);
    } catch (error) {
        console.log(error);
    }
};
</script>
