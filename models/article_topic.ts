import { TranslativeString } from "./translative_string"

export type ArticleTopicModel = {
    id: number
    parent: TranslativeString
    name: TranslativeString
    count: number
}

export type ParentTopicsSet = {
    parent: string
    topics: ArticleTopicModel[]
}