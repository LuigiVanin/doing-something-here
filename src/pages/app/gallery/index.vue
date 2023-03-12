<template lang="">
    <div>Aqui ira ficar a galeria de imagens</div>
    <NewButton width="200px" @click="onAction()">Buscar Me</NewButton>
</template>
<script lang="ts" setup>
import NewButton from "../../../components/New/Button.vue";

const { $client } = useNuxtApp();

const getPosts = $client.gallery.list.query;

const onAction = async () => {
    console.log("onAction");
    const r = await getPosts({});
    console.log(r);
};
</script>
