<template>
  <div>
    <app-loader v-if="isLoad"></app-loader>
    <div class="post" v-else>
      <a class="post-btn" href="/">Main Page</a>
      <app-card
        :title="post ? post.title : 'Not Found'"
        :description="post ? post.user.name : ''"
        :text="post ? post.body : 'Posts not found'"
        :customClass="post ? 'large' : 'large error'"
      ></app-card>
      <the-comments></the-comments>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IData } from '~/types/IData';
import usePostStore from '~/stores/PostStore';

const route = useRoute();
const postStore = usePostStore();

const isLoad = ref<boolean>(true);
const post = computed<IData | null>(() => postStore.getPost);

const handleScroll = (): void => {
  const doc: HTMLElement = document.documentElement;
  const currentPost = postStore.getPost;
  if (
    doc.scrollTop + doc.clientHeight >= doc.scrollHeight - 50 &&
    currentPost
  ) {
    postStore.loadComments();
  }
};

const loadPost = async () => {
  isLoad.value = true;
  await postStore.loadPost(route.params.id);
  isLoad.value = false;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  loadPost();
});
</script>

<style></style>
