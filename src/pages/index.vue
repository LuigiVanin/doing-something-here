<template>
    <div class="column">
        <NuxtLink to="/signin">Faça Login</NuxtLink>
        <NuxtLink to="/signup">Faça Signup</NuxtLink>
        <NuxtLink to="/app">Acess App</NuxtLink>
    </div>
</template>
<style>
.column {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    gap: 10px;
}
</style>
