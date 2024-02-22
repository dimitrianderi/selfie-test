<template>
  <div class="app">
    <header class="header">
      <h1 class="header-title">Posts</h1>
    </header>

    <app-loader v-if="isLoad"></app-loader>
    <main class="main" v-else>
      <TheNav></TheNav>
      <AppLoader v-if="isSubmitting"></AppLoader>
      <ThePosts :posts="posts" v-else></ThePosts>
    </main>
  </div>
</template>

<script setup lang="ts">
import type { IData } from '~/types/IData';
import usePostsStore from '~/stores/PostsStore';

const postsStore = usePostsStore();

const isLoad = ref<boolean>(true);

const isSubmitting = computed<boolean>(() => postsStore.getIsSubmitting);
const posts = computed<IData[]>(() => postsStore.getPosts);

const loadData = async (): Promise<void> => {
  isLoad.value = true;
  await postsStore.getTotalPosts();
  isLoad.value = false;
};

onMounted(() => loadData());
</script>

<style></style>
