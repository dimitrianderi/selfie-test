import type { IComment, IData } from '~/types/IData';
const BASE_URL = import.meta.env.VITE_BASE_URL;

const usePostStore = defineStore('postsStore', () => {
  const post = ref<IData | null>(null);
  const comments = ref<IComment[]>([]);
  const commentsLoaded = ref<IComment[]>([]);
  const user = ref<string>('');

  const getPost = computed<IData | null>(() => post.value)
  const getComments = computed<IComment[]>(() => comments.value)
  const getCommentsLoaded = computed(() => commentsLoaded.value)
  const getUser = computed(() => user.value)

  const commentsFiltered = computed<IComment[]>(() => getComments.value
    .filter((comment) => {
      if (getUser.value) {
        return comment.email.toLowerCase().includes(getUser.value.toLowerCase())
      }
      return true;
    })
  )

  const setPost = (currentPost: IData): void => {
    post.value = { ...currentPost };
  };

  const setComments = (data: IComment[]) => {
    comments.value = [...data];
  }

  const setUser = (username: string) => {
    user.value = username;
    commentsLoaded.value.length = 0;
    loadComments();
  }

  const loadPost = async (payload: string | string[]): Promise<void> => {
    const _post: string = `/${payload}`;
    const _expand: string = `?_expand=user`
    const _embed: string = `&_embed=comments`
    const URL: string = `${BASE_URL}posts${_post}${_expand}${_embed}`;

    try {
      const res = await fetchData(URL);
      const data = {
        id: res.id,
        title: res.title,
        body: res.body,
        user: { name: res.user.name },
      };
      setComments(res.comments);
      setPost(data);
      loadComments();
    } catch (err) { throw new Error() }
  }

  const loadComments = async (): Promise<void> => {
    // const _post: string = `?postId=${payload}`;
    // const URL: string = `${BASE_URL}comments${_post}`;
    for (let i = 0; i < 2; i++) {
      if (commentsLoaded.value.length < commentsFiltered.value.length) {
        commentsLoaded.value.push(commentsFiltered.value[commentsLoaded.value.length])
        // console.log(commentsLoaded)
      }
    }
    try {

      // const res = await fetchData(URL);

    } catch (err) { throw new Error() }
  }

  return {
    getCommentsLoaded,
    getComments,
    getPost,
    loadComments,
    loadPost,
    setUser,
  }
})

export default usePostStore;
