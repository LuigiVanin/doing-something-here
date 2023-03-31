import ToastPlugin, { PluginOptions } from "vue-toastification";

export default defineNuxtPlugin(({ vueApp: app }) => {
    const options: PluginOptions = {
        // position: "",
        timeout: 5000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: false,
        closeButton: "button",
        icon: true,
        rtl: false,
    };

    app.use(ToastPlugin, options);
});
