<template>
    <button :class="{ hold: props.hold }" @click="handleClick">
        <slot></slot>
        <font-awesome :icon="['fas', 'plane']" class="plane" :class="{ spinning: hold }"/>
    </button>


</template>
<script setup lang="ts">

const props = defineProps<{
    hold: boolean
}>()

function handleClick(e: Event) {
    if (props.hold) {
        e.stopImmediatePropagation()
    }
}

</script>



<style scoped lang="scss">
$bg: #fff;
$text: #382b22;
$light-btn-color: #f0f7ff;
$btn-color: #e9f3ff;
$dark-btn-color: #c4d4f9;
$btn-color-border: #6C9BE1;
$btn-color-shadow: #e2efff;


button {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 180px;
    height: 50px;    
    cursor: pointer;
    outline: none;
    border: 0;
    vertical-align: middle;
    text-decoration: none;
    font-size: 1rem;
    font-family: inherit;
    align-self: flex-end;
    bottom: 10px;
    font-weight: 800;



    color: $text;

    background: $light-btn-color;
    border: 2px solid $btn-color-border;
    border-radius: 15px;
    transform-style: preserve-3d;
    transition: transform 150ms cubic-bezier(0, 0, 0.58, 1), background 150ms cubic-bezier(0, 0, 0.58, 1);



    &::before {
        position: absolute;
        content: '';
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: $dark-btn-color;
        border-radius: inherit;
        box-shadow: 0 0 0 2px $btn-color-border, 0 0.625em 0 0 $btn-color-shadow;
        transform: translate3d(0, 0.75em, -1em);
        transition: transform 150ms cubic-bezier(0, 0, 0.58, 1), box-shadow 150ms cubic-bezier(0, 0, 0.58, 1);
    }

    &:hover {
        background: $btn-color;
        transform: translate(0, 0.25em);

        &::before {
            box-shadow: 0 0 0 2px $btn-color-border, 0 0.5em 0 0 $btn-color-shadow;
            transform: translate3d(0, 0.5em, -1em);
        }
    }

    &:active, &.hold {
        background: $btn-color;
        transform: translate(0em, 0.75em);

        &::before {
            box-shadow: 0 0 0 2px $btn-color-border, 0 0 $btn-color-shadow;
            transform: translate3d(0, 0, -1em);
        }
    }
    .plane.spinning {
        animation: spin 1s ease-in-out infinite;
    }

}

@keyframes spin {
    0% {
        rotate: 0deg;
    }

    50% {
        rotate: 360deg;
    }
    100% {
        rotate: 360deg;
    }
}

</style>