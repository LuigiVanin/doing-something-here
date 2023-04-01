// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    build: {
        transpile: ["trpc-nuxt"],
    },
    runtimeConfig: {
        public: {
            BUCKET_URL: process.env.BUCKET_URL,
        },
    },
    ssr: true,
    srcDir: "src/",
    modules: ["@formkit/nuxt"],
    // plugins: ["~/plugins/inline-svg.ts"],
});
