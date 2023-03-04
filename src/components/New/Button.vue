<template>
    <button :class="attrs.class" :style="attrs.style">
        <slot>
            {{ text || "Click" }}
        </slot>
    </button>
</template>
<script lang="ts" setup>
interface Props {
    text?: string;
}

const props = defineProps<Props>();
const attrs = useAttrs();

console.log(attrs);
</script>
