import { FiltersType } from "@/hooks/useFilters"
import { Article } from "@/models/article"
import axios from "axios"

export type ApiSearchParams = {
    page: number
    query: string
    filters: FiltersType
}

export type ApiSearchResponse = {
    articles: Article[]
    totalPages: number
}

export const searchApi = async ({
    page,
    query,
    filters
}: ApiSearchParams): Promise<ApiSearchResponse> => {
    const response = await axios.get("api/articles/search", {
        params: {
            page: page,
            query: query,
            filters: encodeURIComponent(JSON.stringify(filters))
        },
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return {articles: JSON.parse(JSON.stringify(response.data.response)), totalPages: response.data.totalPages};
}