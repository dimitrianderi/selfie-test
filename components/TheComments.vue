<template>
  <div class="comments">
    <h2 class="comments-title">Comments</h2>

    <div class="comments-search">
      <AppSearch
        placeholder="search by user..."
        v-model="search"
        @clear="clearSearch()"
      ></AppSearch>
    </div>

    <div class="comments__content" v-if="comments.length">
      <ul class="comments__content-items">
        <li v-for="comment in comments" :key="comment.id">
          <AppCard
            :title="comment.name"
            :description="comment.email"
            :text="comment.body"
          ></AppCard>
        </li>
      </ul>
    </div>
    <app-card
      title="Not Comments"
      text="No comments yet"
      customClass="error"
      v-else
    ></app-card>
  </div>
</template>

<script setup lang="ts">
import type { IComment } from '~/types/IData';
import usePostStore from '~/stores/PostStore';

const postStore = usePostStore();

const search = ref<string>('');

let setUser: ReturnType<typeof setTimeout>;

watch(search, (newValue: string): void => {
  clearTimeout(setUser);

  setUser = setTimeout(() => {
    postStore.setUser(newValue);
  }, 1000);
});

const comments = computed<IComment[]>(() => postStore.getCommentsLoaded);

const clearSearch = (): void => {
  search.value = '';
};
</script>

<style></style>
