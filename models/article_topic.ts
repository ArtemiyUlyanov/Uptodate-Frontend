export type ArticleTopic = {
    id: number
    parent: string
    name: string
}

export type ParentTopicsSet = {
    parent: string
    topics: ArticleTopic[]
}