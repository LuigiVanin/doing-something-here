<template>
  <header>Aqui está o header</header>
  <main>
    <Spinner v-if="!auth?.user" />
    <template v-else>
      <slot />
    </template>
  </main>

  <footer>Aqui está o footer</footer>
</template>

<script setup lang="ts">
const { getAuth, auth } = useAuth()

onMounted(async () => {
  if (!auth.value) {
    await getAuth()
  }
})
setInterval(() => {
  getAuth()
}, 1000 * 60 * 15)
</script>
