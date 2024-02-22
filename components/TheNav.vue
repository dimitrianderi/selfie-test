<template>
  <nav class="nav">
    <div class="nav__section">
      <span class="nav__section-sort" @click="postsStore.setSort()">
        Sort by title
        <NuxtIcon class="icon" :name="sort.toUpperCase()" v-if="sort" />
      </span>
    </div>
    <AppPagination></AppPagination>
    <div class="nav__section">
      <AppSearch
        placeholder="search by title..."
        v-model="search"
        @clear="clearSearch()"
      ></AppSearch>
    </div>
  </nav>
</template>

<script setup lang="ts">
import usePostsStore from '~/stores/PostsStore';

const postsStore = usePostsStore();
const sort = computed<string>(() => postsStore.getSort);
const search = ref<string>('');

const clearSearch = (): void => {
  search.value = '';
};

let postSearch: ReturnType<typeof setTimeout>;

watch(search, (newValue: string): void => {
  clearTimeout(postSearch);

  postSearch = setTimeout((): void => {
    postsStore.setSearch(newValue);
  }, 1000);
});
</script>

<style></style>
