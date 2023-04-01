export const useImageInput = () => {
    const imageFile = ref<null | File>(null);
    const imageUrlPreview = ref<string | null>(null);

    const handleImageInput = (event: Event) => {
        imageFile.value = (event.target as HTMLInputElement).files![0];
        imageUrlPreview.value = !imageFile.value
            ? null
            : URL.createObjectURL(imageFile.value);
    };

    const setImagePreview = (url: string) => {
        imageUrlPreview.value = url;
    };

    return {
        imageFile,
        imageUrlPreview,
        handler: handleImageInput,
        setImagePreview,
    };
};
