<template>
    <div :class="['card', customClass]">
        <h2 class="card-title">{{ title }}</h2>
        <div class="card-author">
            <p>{{ description }}</p>
        </div>
        <div class="card-text">
            <p>{{ text }}</p>
        </div>
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
defineProps({
    title: {
        type: String as PropType<string>,
        require: true,
        default: '',
    },
    description: {
        type: String as PropType<string>,
        require: false,
    },
    text: {
        type: String as PropType<string>,
        require: true,
        default: '',
    },
    customClass: {
        type: String as PropType<string>,
        require: false,
    },
});
</script>

<style></style>
