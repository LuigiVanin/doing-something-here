<template>
    <div>Olá</div>
</template>
<script lang="ts" setup>
import { useAuth } from "../hooks/useAuth";

const { $client } = useNuxtApp();

definePageMeta({
    middleware: ["auth"],
});

const { auth } = useAuth();
</script>
