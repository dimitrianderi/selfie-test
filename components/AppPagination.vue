<template>
  <ul class="pagination">
    <li :class="['pagination-cell', 'icon', {'disabled': page === 1 || isSubmitting}]" @click="postsStore.startPage()">
      <nuxt-icon name="ArrowMaxLeft"/>
    </li>
    <li :class="['pagination-cell', 'icon', {'disabled': page === 1 || isSubmitting}]" @click="postsStore.prevPage()">
      <nuxt-icon name="ArrowLeft"/>
    </li>
    <li class="pagination-cell">
      {{ page }}
    </li>
    <li :class="['pagination-cell', 'icon', {'disabled': page === maxPage || isSubmitting}]" @click="postsStore.nextPage()">
      <nuxt-icon name="ArrowRight"/>
    </li>
    <li :class="['pagination-cell', 'icon', {'disabled': page === maxPage || isSubmitting}]" @click="postsStore.endPage()">
      <nuxt-icon name="ArrowMaxRight"/>
    </li>
  </ul>
</template>

<script setup lang="ts">
import usePostsStore from '~/stores/PostsStore';

const postsStore = usePostsStore();

const page = computed<number>(() => postsStore.getPage);
const maxPage = computed<number>(() => postsStore.getMaxPage);
const isSubmitting = computed<boolean>(() => postsStore.getIsSubmitting)
</script>

<style></style>
