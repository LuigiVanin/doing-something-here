import { useAuth } from "../hooks/useAuth";
function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export default defineNuxtRouteMiddleware(async (to, from) => {
    // if (!process.server) {
    //     await sleep(5000);
    // }
    const { auth, getAuth } = useAuth();

    console.log(auth.value);
    if (!auth.value) {
        await getAuth();
    }
    console.log(auth.value);
    console.log("client");
});
