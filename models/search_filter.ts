export type SearchFilter = {
    value: string
    type: SearchFilterType
}

export enum SearchFilterType {
    TOPIC,
    AUTHOR,
    SORT_BY
}