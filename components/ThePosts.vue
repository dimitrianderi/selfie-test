<template>
    <div>
        <ul class="posts" v-if="posts.length">
            <li v-for="post in posts" :key="post.id">
                <app-card
                    :title="post.title"
                    :description="post.user.name"
                    :text="post.body"
                    ><a class="posts-btn" :href="`/posts/${post.id}`"
                        >More</a
                    ></app-card
                >
            </li>
        </ul>

        <app-card
            v-else
            title="Not Found"
            text="Posts not found"
            customClass="error"
        ></app-card>
    </div>
</template>

<script setup lang="ts">
import type { IData } from '~/types/IData';

defineProps({
    posts: {
        type: Array as () => IData[],
        require: true,
        default: [],
    },
});
</script>

<style></style>
