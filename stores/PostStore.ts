import type { IComment, IData } from '~/types/IData';
const BASE_URL = import.meta.env.VITE_BASE_URL;

const usePostStore = defineStore('postsStore', () => {
  const post = ref<IData | null>(null);
  const comments = ref<IComment[]>([]);
  const commentsLoaded = ref<IComment[]>([]);
  const user = ref<string>('');

  const getPost = computed<IData | null>(() => post.value)
  const getComments = computed<IComment[]>(() => comments.value)
  const getCommentsLoaded = computed<IComment[]>(() => commentsLoaded.value)
  const getUser = computed<string>(() => user.value)

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

  const setComments = (data: IComment[]): void => {
    comments.value = [...data];
  }

  const setUser = (username: string): void => {
    user.value = username;
  }

  watch(user, () => {
    commentsLoaded.value.length = 0;
    loadComments();
  })

  const loadPost = async (payload: string | string[]): Promise<void> => {
    const _post: string = `/${payload}`;
    const _expand: string = `?_expand=user`
    const _embed: string = `&_embed=comments`
    const URL: string = `${BASE_URL}posts${_post}${_expand}${_embed}`;

    try {
      const res = await fetchData(URL);
      const data: IData = {
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
    for (let i = 0; i < 2; i++) {
      if (commentsLoaded.value.length < commentsFiltered.value.length) {
        commentsLoaded.value.push(commentsFiltered.value[commentsLoaded.value.length])
      }
    }
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
