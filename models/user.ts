import { ArticleModel } from "./article"
import { ArticleCommentModel } from "./article_comment"

export type UserModel = {
    id: number
    username: string
    email: string
    firstName: string
    lastName: string
    icon: string
    roles: UserRole[]
    articles?: ArticleModel[]
    likedArticles?: ArticleModel[]
    comments?: ArticleCommentModel[]
}

export type UserRole = {
    id: number
    name: string
}