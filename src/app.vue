<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>
<script lang="ts" setup>
import { useAuth } from "./composables/useAuth";

const { isLoading, getAuth } = useAuth();
onMounted(async () => {
    getAuth();
});
</script>
