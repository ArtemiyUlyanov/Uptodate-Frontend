import { ArticleModel } from "./article"
import { UserModel } from "./user"

export type ArticleCommentModel = {
    id: number
    article: ArticleModel
    content: string
    resources?: string[]
    ArticleCommentModelLikeButtons?: UserModel[]
    likedUsernames: string[]
    createdAt: string
    author: UserModel
}