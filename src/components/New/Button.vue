<template>
    <button
        :class="[
            attrs.class,
            'new-button',
            size || 'md',
            type || 'main',
            hoverEffect || 'strong-effect',
        ]"
        @click="rippleEffect && createRipple($event as NewPointerEvent)"
        :style="{ width: width || '100%', fontWeight: fw }"
        :disabled="disabled"
    >
        <span class="button_gradient" />
        <template v-if="rippleEffect">
            <span
                class="button__ripple"
                v-for="ripple in rippleQueue"
                :key="ripple.id"
                :style="{ left: ripple.x + 'px', top: ripple.y + 'px' }"
            />
        </template>
        <span class="button__content">
            <slot> Click </slot>
        </span>
    </button>
</template>
<script lang="ts" setup>
import { StyleValue } from "vue";

interface Props {
    style?: StyleValue;
    width?: string;
    size?: "sm" | "md" | "lg";
    type?: "main" | "outlined" | "soft" | "simple" | "weak" | "shadow";
    hoverEffect?: `${
        | "gradient"
        | "strong"
        | "shadow"
        | "soft"
        | "glow"}-effect`;
    fw?: number;
    disabled?: boolean;
    rippleEffect?: boolean;
}

interface RippleData {
    id: number;
    x: number;
    y: number;
}

type NewPointerEvent = PointerEvent & { layerX: number; layerY: number };

const rippleQueue = ref<Array<RippleData>>([]);

const props = withDefaults(defineProps<Props>(), {
    width: "100%",
    style: "",
    size: "md",
    type: "main",
    hoverEffect: "strong-effect",
    disabled: false,
    rippleEffect: true,
});
const attrs = useAttrs();

const createRipple = (event: NewPointerEvent) => {
    rippleQueue.value.push({
        id: Math.floor(Math.random() * 1000000),
        x: event.layerX,
        y: event.layerY,
    });
    setTimeout(() => {
        rippleQueue.value.shift();
    }, 700);
};
</script>
<style lang="scss">
@import "../../styles/theme.scss";

button.new-button {
    border: none;
    cursor: pointer;
    font-family: "Poppins", sans-serif;
    padding-inline: 0px;
    position: relative;
    transition: all 0.15s ease-in-out;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 5px;
    transition: all 0.15s ease-in-out;

    span.button__ripple {
        position: absolute;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.252);
        animation: ripple 0.7s ease-out;
        transform: translateX(-50%) translateY(-50%);
    }

    &[disabled] {
        cursor: not-allowed;
        background: var(--disable-gray-light) !important;
        color: var(--border-gray-light) !important;
    }

    &.glow-effect {
        transition: all 0.1s linear;
    }
    /* box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.3); */
    /* inset: 0; */
    /* overflow: hidden; */
    z-index: 1;

    span.button__content {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 5px;
        transition: all 0.15s ease-in-out;
    }

    &.gradient-effect > span.button__content {
        z-index: 1000;
    }
    span.button_gradient {
        background: var(--main-gradient-light);
        width: 100%;
        height: 100%;
        position: absolute;
        transition: all 0.3s ease-in-out;
        opacity: 0;
        /* right: -90%; */
        right: -5%;
        border-radius: 8px;

        z-index: 1 !important;
    }

    &.md {
        height: 40px;
        font-weight: 400;
        font-size: 15px;
        line-height: 16px;
        border-radius: 8px;
    }
    &.sm {
        height: 30px;
        font-size: 13px;
        line-height: 15px;
        border-radius: 7px;
    }
    &.lg {
        height: 50px;
        font-style: normal;
        font-size: 17px;
        line-height: 18px;
        border-radius: 10px;
    }
    &.main,
    &.shadow {
        background: var(--main-blue-light);
        color: white;
    }
    &.soft {
        background: var(--main-blue-soft-light);
        color: var(--main-blue-light);
        font-weight: 600;
    }

    &.shadow {
        box-shadow: 0px 0px 15px 5px rgba(0, 0, 0, 0.151);
        transition: all 0.2s ease-in-out;
    }

    &.main,
    &.shadow {
        &.strong-effect:hover {
            background: var(--main-blue-strong-light);
            box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0);
        }
        &.shadow-effect:hover {
            background: var(--main-blue-strong-light);
            box-shadow: 0px 0px 15px 5px rgba(0, 0, 0, 0.151);
        }
        &.soft-effect:hover {
            background: var(--main-blue-soft-light);
            color: var(--main-blue-light);
        }
        &.glow-effect:hover {
            box-shadow: 0px 0px 25px 0px rgba(#0085ff, 0.5);
        }
        &.gradient-effect:hover {
            /* background: var(--main-gradient-light); */
            span.button_gradient {
                right: 0;
                opacity: 1;
                transform: scale(1.2) rotate(1deg);
            }
        }
    }
    &.soft {
        &.strong-effect:hover {
            background: var(--main-blue-strong-light);
            /* box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0); */
            color: white;
        }
        &.shadow-effect:hover {
            /* background: var(--main-blue-strong-light); */
            box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.068);
        }
        &.soft-effect:hover {
            background: var(--main-blue-soft-light);
            color: var(--main-blue-light);
        }
        &.glow-effect:hover {
            box-shadow: 0px 0px 15px 0px rgba(#0085ff, 0.3);
        }
        &.gradient-effect:hover {
            /* background: var(--main-gradient-light); */
            span.button_gradient {
                right: 0;
                opacity: 1;
                transform: scale(1.2) rotate(1deg);
            }
        }
    }

    &.outlined {
        background: transparent;
        border: 3px solid var(--main-blue-light);
        color: var(--main-blue-light);
        font-weight: 700;

        &.strong-effect:hover {
            background: var(--main-blue-strong-light);
            /* box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.3); */
            color: white;
        }

        &.gradient-effect:hover {
            /* background: var(--main-gradient-light); */
            background: var(--main-blue-strong-light);
            color: white;
            border: 2px solid white;
            transition: 0.5 all linear;
            span.button_gradient {
                right: 0;
                opacity: 1;
                transform: scale(1.2) rotate(1deg);
            }
        }

        &.shadow-effect:hover {
            background: var(--main-blue-strong-light);
            box-shadow: 0px 0px 15px 2px rgba(0, 0, 0, 0.151);
            color: white;
            border: 2px solid var(--main-blue-strong-light);
        }
        &.soft-effect:hover {
            border: 2px solid var(--main-blue-soft-light);
            background: var(--main-blue-soft-light);
            color: var(--main-blue-light);
        }
        &.glow-effect:hover {
            background: var(--main-blue-strong-light);
            color: white;
            box-shadow: 0px 0px 25px 0px rgba(#0085ff, 0.5);
            border: 2px solid var(--main-blue-strong-light);
        }
    }

    &.weak {
        background: transparent;
        border: 1.5px solid #d9d9d9;

        &:hover {
            background: var(--disable-gray-light);
        }
    }

    &.simple {
        background: transparent;
        border: none;
        color: var(--main-blue-light);
        font-weight: 700;
        &:hover {
            background: var(--main-blue-soft-light);
            /* color: white; */
        }
    }
}

@keyframes ripple {
    0% {
        width: 0px;
        height: 0px;
        opacity: 1;
    }
    100% {
        width: 450px;
        height: 450px;
        opacity: 0;
    }
}
</style>
