import axios from "axios"
import { authorizedAxios } from "./axios.config"
import { ErrorResponse } from "./responses.types"
import { MessageResponse } from "./responses.types"

export type ApiArticleLikeButtonParams = {
    id: number
}

export type ApiArticleLikeButtonResponse = {
    message?: MessageResponse
    error?: ErrorResponse
}

export const likeArticleApi = async ({
    id
}: ApiArticleLikeButtonParams): Promise<ApiArticleLikeButtonResponse> => {
    try {
        const response = await authorizedAxios.post("/articles/like", null, {
            params: {
                id: id
            }
        });
    
        const message = JSON.parse(JSON.stringify(response.data));

        return {message};
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return {error: {status: error.response?.data.status, message: error.response?.data.message}}
        }
        
        return {};
    }
}