export type FilterOption = {
    name: string
    value: string
}

export type FilterSection = {
    name: string
    options: FilterOption[]
}

export type TopicsFilterOption = FilterOption & {
    count: number
}

export type TopicsFilterSection = FilterSection & {
    count: number
    options: TopicsFilterOption[]
}