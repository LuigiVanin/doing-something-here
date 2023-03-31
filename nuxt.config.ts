// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    build: {
        transpile: ["trpc-nuxt"],
    },
    ssr: true,
    srcDir: "src/",
    modules: ["@formkit/nuxt"],
    // plugins: ["~/plugins/inline-svg.ts"],
});
