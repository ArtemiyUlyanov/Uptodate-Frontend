import { Decoration } from "@/ui/decorations/decoration.type"
import { ArticleCommentModel } from "./article_comment"
import { ArticleTopicModel } from "./article_topic"
import { UserModel } from "./user"

export type ArticleModel = {
    id: number
    heading: string
    description: string
    content: string
    parsedContent?: Decoration[]
    createdAt: string
    comments?: ArticleCommentModel[]
    ArticleLikeButtons?: UserModel[]
    likedUsernames: string[]
    views: number
    topics: ArticleTopicModel[]
    jwt_token?: string
    author?: UserModel
}