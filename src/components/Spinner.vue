<script setup lang="ts"></script>

<template>
    <div class="loader">
        <span> </span>
    </div>
</template>

<style scoped>
.loader {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    height: 200px;
}
span {
    width: 25px;
    height: 25px;
    border: solid 5px transparent;
    border-left-color: greenyellow;
    border-bottom-color: whitesmoke;
    border-radius: 50%;
    animation: 0.5s linear infinite spin;
}
@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>
