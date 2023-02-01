<template>
    <div v-if="isLoading"><Spinner /></div>
    <NuxtPage v-else />
</template>
<script lang="ts" setup>
import Spinner from "./components/Spinner.vue";
import { useAuth } from "./hooks/useAuth";

const { isLoading, getAuth } = useAuth();
onMounted(async () => {
    getAuth();
});
</script>
