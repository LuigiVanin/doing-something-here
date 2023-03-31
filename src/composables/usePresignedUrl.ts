// TODO: Aqui ficara o tratamento da rota de presignUrl
export const usePresignedUrl = () => {
    const presignedUrl = ref<string>("");
    const uuid = ref<string>("");
    const { $client } = useNuxtApp();

    const getPresignedUrl = async (image: File) => {
        try {
            const ext = image.name.split(".").pop();
            const data = await $client.s3.postSignedUrl.query({
                fileExt: ext || "",
            });
            // TODO: Tratar possiveis erros aqui ▼
            if (!data) {
                return;
            }
            presignedUrl.value = data.url;
            uuid.value = data.uuid;

            return { uuid: data.uuid, url: data.url, ext };
        } catch (err) {
            // TODO: Tratar possiveis erros aqui ▼
            console.log(err);
        }
    };

    return {
        presignedUrl,
        uuid,
        get: getPresignedUrl,
    };
};
