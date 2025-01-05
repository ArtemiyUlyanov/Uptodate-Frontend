import { Article } from "./article"
import { ArticleComment } from "./article_comment"

export type User = {
    id: number
    username: string
    email: string
    firstName: string
    lastName: string
    icon: string
    roles: UserRole[]
    articles?: Article[]
    comments?: ArticleComment[]
    jwt_token?: string
}

export type UserRole = {
    id: number
    name: string
}