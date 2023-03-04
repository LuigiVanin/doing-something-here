<template>
    <div class="column">
        <NuxtLink to="/auth/signin">Faça Login</NuxtLink>
        <NuxtLink to="/auth/signup">Faça Signup</NuxtLink>
        <NuxtLink to="/app">Acess App</NuxtLink>
        <NewButton class="blue-button" text="alow alow" />
    </div>
</template>
<style lang="scss">
.column {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    gap: 10px;

    button {
        background: blue;
    }
}
</style>
