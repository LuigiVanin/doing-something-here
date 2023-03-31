<template lang="">
    <div>
        <div :class="['input__wrapper']">
            <input />
            <span :class="['input__icon']">
                <slot />
            </span>
        </div>
    </div>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped></style>
