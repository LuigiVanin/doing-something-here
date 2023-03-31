import { autoAnimatePlugin } from "@formkit/auto-animate/vue";

export default defineNuxtPlugin(({ vueApp: app }) => {
    app.use(autoAnimatePlugin);
});
