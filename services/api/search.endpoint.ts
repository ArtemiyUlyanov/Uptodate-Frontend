import { FiltersType } from "@/hooks/explore/useFilters"
import { Article } from "@/models/article"
import axios from "axios"

export type ApiSearchParams = {
    count?: number
    miniSearch: boolean
    page?: number
    pagesCount?: number
    query: string
    filters: FiltersType
}

export type ApiSearchResponse = {
    articles: Article[]
    totalElements: number
}

export const searchApi = async ({
    count,
    miniSearch,
    page,
    pagesCount,
    query,
    filters
}: ApiSearchParams): Promise<ApiSearchResponse> => {
    const response = await axios.get("api/articles/search", {
        params: {
            count: count,
            page: page,
            pagesCount: pagesCount,
            query: query,
            filters: encodeURIComponent(JSON.stringify(filters))
        },
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return {articles: JSON.parse(JSON.stringify(response.data.response)), totalElements: response.data.totalElements};
}