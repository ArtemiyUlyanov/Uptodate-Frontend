import { ArticleModel } from "@/models/article"
import { authorizedAxios } from "./axios.config"
import axios from "axios"
import { ErrorResponse } from "./responses.types"

export type ApiArticleGetParams = {
    id?: number
    slug?: string
}

export type ApiArticleGetResponse = {
    model?: ArticleModel
    error?: ErrorResponse
}

export const getArticleApi = async ({
    id,
    slug
}: ApiArticleGetParams): Promise<ApiArticleGetResponse> => {
    try {
        if (id) {
            const response = await authorizedAxios.get(`/articles/id/${id}`, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
        
            const model = JSON.parse(JSON.stringify(response.data.response));
            return {model};
        }

        if (slug) {
            const response = await authorizedAxios.get(`/articles/slug/${slug}`, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
        
            const model = JSON.parse(JSON.stringify(response.data.response));
            return {model};
        }

        return {};
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return {error: {status: error.response?.data.status, message: error.response?.data.message}}
        }
        
        return {};
    }
}