import { usePresignedUrl } from "./usePresignedUrl";
// Aqui ficara a lógica de pegar o presigned url e fazer o upload da imagem,
// retornando o url da imagem em um aws bucket
export const useImageUpload = () => {
    const { get, presignedUrl, uuid } = usePresignedUrl();
    const loading = ref(false);
    const url = ref("");

    const upload = async (image: File) => {
        loading.value = true;
        try {
            const result = await get(image);
            if (!result) return;
            await fetch(presignedUrl.value, {
                method: "PUT",
                body: image,
            });
            url.value = `https://nuxt-project-images.s3.sa-east-1.amazonaws.com/${uuid.value}.${result.ext}`;
            console.log(url.value);
        } catch (err) {
            // TODO: Tratar possiveis erros aqui ▼
            console.log(err);
        } finally {
            loading.value = false;
        }
    };

    return { url, upload };
};
