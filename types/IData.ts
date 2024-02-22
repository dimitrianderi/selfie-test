interface IUser {
  name: string
}

export interface IComment {
  id: number,
  postId: number,
  name: string,
  body: string,
  email: string
  user?: string
}

export interface IData {
  id: number,
  user: IUser
  title: string,
  body: string,
  comments?: IComment[]
}
