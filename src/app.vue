<template>
    <div>{{ data }}</div>
</template>
<script lang="ts" setup>
const { $client } = useNuxtApp();
const { data } = await $client.hello.useQuery({ text: "luisfvanin@gmail.com" });

console.log(data.value);
</script>
