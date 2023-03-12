<template>
    <div class="column">
        <NuxtLink to="/auth/signin">Faça Login</NuxtLink>
        <NuxtLink to="/auth/signup">Faça Signup</NuxtLink>
        <NuxtLink to="/app">Acess App</NuxtLink>
        <NewButton
            type="outlined"
            hover-effect="strong-effect"
            size="lg"
            ripple-effect
        >
            My text
        </NewButton>
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

    /* button {
        background: blue;
    } */
}
</style>
