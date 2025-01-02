import { Article } from "./article"
import { User } from "./user"

export type ArticleComment = {
    id: number
    article: Article
    resources: String[]
    createdAt: string
    author: User
}