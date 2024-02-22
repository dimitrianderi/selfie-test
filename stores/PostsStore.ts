import type { IData } from '~/types/IData';
import type { Sort } from '~/types/Sort';
import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { fetchData } from '~/utils/fetchData.js'
const BASE_URL = import.meta.env.VITE_BASE_URL;
const PER_PAGE = import.meta.env.VITE_PER_PAGE;

const sortOptions: Record<Sort, Sort> = {
  "": "asc",
  "asc": "desc",
  "desc": ""
};

const usePostsStore = defineStore('postsStore', () => {
  const posts = reactive<IData[]>([]);

  const page = ref<number>(1)
  const totalPosts = ref<number>(0)
  const maxPage = computed<number>(() => Math.ceil(totalPosts.value / PER_PAGE) || 1);
  const isSubmitting = ref<boolean>(false)
  const sort = ref<Sort>('')
  const search = ref<string>('')

  watch(maxPage, (newValue: number): void => {
    if (page.value > newValue) {
      page.value = newValue
    }
  })

  const getPosts = computed<IData[]>(() => posts)
  const getPage = computed<number>(() => page.value)
  const getMaxPage = computed<number>(() => maxPage.value)
  const getSort = computed<Sort>(() => sort.value)
  const getIsSubmitting = computed<boolean>(() => isSubmitting.value)
  const getSearch = computed<string>(() => search.value)

  const startPage = async (): Promise<void> => {
    await loadPosts(1, sort.value)
    page.value = 1
  }

  const prevPage = async (): Promise<void> => {
    await loadPosts(page.value - 1, sort.value)
    page.value -= 1
  }

  const nextPage = async (): Promise<void> => {
    await loadPosts(page.value + 1, sort.value)
    page.value += 1
  }

  const endPage = async (): Promise<void> => {
    await loadPosts(maxPage.value, sort.value)
    page.value = maxPage.value
  }

  const setPosts = (data: IData[]): void => {
    posts.splice(0, posts.length, ...data);
  }

  const setTotalPosts = (total: number): void => {
    totalPosts.value = total
  }

  const setSort = async (): Promise<void> => {
    await loadPosts(page.value, sortOptions[sort.value])
    sort.value = sortOptions[sort.value];
  }

  const setSearch = (text: string): void => {
    search.value = text;
    getTotalPosts()
  }

  const changeIsSubmitting = (val: boolean): void => {
    isSubmitting.value = val
  }

  const getTotalPosts = async (): Promise<void> => {
    const _title: string = search.value ? `?title_like=${search.value}` : ''
    const URL: string = `${BASE_URL}posts${_title}`;
    try {
      changeIsSubmitting(true)
      const total = (await fetchData(URL)).length;
      await setTotalPosts(total);
      await loadPosts(page.value, sort.value)
    } catch (err) {
      throw new Error();
    }
  }

  const loadPosts = async (page: number = 1, sort: Sort = ''): Promise<void> => {
    const _expand: string = `?_expand=user`
    const _page: string = `&_page=${page}`
    const _order: string = sort ? `&_sort=title&_order=${sort}` : ''
    const _limit: string = `&_limit=${PER_PAGE}`
    const _title: string = search.value ? `&title_like=${search.value}` : ''
    const URL: string = `${BASE_URL}posts${_expand}${_title}${_page}${_order}${_limit}`;

    try {
      changeIsSubmitting(true)
      const res = await fetchData(URL);
      const data: IData[] = res.map((item: IData) => ({
        id: item.id,
        title: item.title,
        body: item.body,
        user: { name: item.user.name }
      }));
      setPosts(data);
    } catch (err) { throw new Error() }
    finally {
      changeIsSubmitting(false)
    }
  }

  return {
    getIsSubmitting,
    getMaxPage,
    getSearch,
    getPosts,
    getSort,
    getPage,
    getTotalPosts,
    startPage,
    setSearch,
    prevPage,
    nextPage,
    setSort,
    endPage,
  }
})

export default usePostsStore;
