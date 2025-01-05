import { ArticleComment } from "./article_comment"
import { ArticleTextFragment } from "./article_text_fragment"
import { ArticleTopic } from "./article_topic"
import { User } from "./user"

export type Article = {
    id: number
    heading: string
    description: string
    content: ArticleTextFragment[]
    createdAt: string
    comments?: ArticleComment[]
    topics: ArticleTopic[]
    jwt_token?: string
    author?: User
}