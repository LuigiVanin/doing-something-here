import { usePresignedUrl } from "./usePresignedUrl";

export const useImageUpload = () => {
    const { get, presignedUrl, uuid } = usePresignedUrl();
    const config = useRuntimeConfig();
    const loading = ref(false);
    const url = ref("");

    const upload = async (image: File) => {
        loading.value = true;
        try {
            const result = await get(image);
            if (!result) {
                return;
            }
            await fetch(presignedUrl.value, {
                method: "PUT",
                body: image,
            });
            url.value = `${config.public.BUCKET_URL}/${uuid.value}.${result.ext}`;
        } catch (err) {
            // TODO: Tratar possiveis erros aqui ▼
            console.log(err);
        } finally {
            loading.value = false;
        }
    };

    return { url, upload };
};
