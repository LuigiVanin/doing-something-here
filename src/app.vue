<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>
<script lang="ts" setup>
import "vue-toastification/dist/index.css";
// import { useAuth } from "./composables/useAuth";

// const { isLoading, getAuth } = useAuth();
// onMounted(async () => {
//     getAuth();
// });
</script>

<style lang="scss">
@import "./styles/theme.scss";
@import "./styles/reset.scss";
@import "./styles/global.scss";
@import "./styles/mixins.scss";
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap");
:root {
    --main-blue-light: #369fff;
    --main-blue-strong-light: #0085ff;
    --main-blue-soft-light: #dbeeff;
    --disable-gray-light: #f0f0f0;
    --border-gray-light: #b7b7b7;
    --strong-border-gray-light: #d9d9d9;
    --main-font-light: black;
    --main-gradient-light: linear-gradient(
        90.95deg,
        transparent 19.34%,
        #0071ff 70.42%,
        #0f40ee 98.53%
    );
}

html,
body {
    font-family: "Poppins", sans-serif;
}
</style>
