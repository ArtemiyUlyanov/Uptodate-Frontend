import { ArticleModel } from "./article"
import { ArticleLikeModel } from "./article_like"
import { CommentModel } from "./comment"
import { CommentLikeModel } from "./comment_like"

export type UserModel = {
    id: number
    username: string
    email: string
    firstName: string
    lastName: string
    icon: string
    roles: Array<UserRole>
    likedArticles?: Array<ArticleLikeModel>
    likedComments?: Array<CommentLikeModel>
    articlesIds: Array<number>
    commentsIds: Array<number>
}

export type UserRole = {
    id: number
    name: string
}