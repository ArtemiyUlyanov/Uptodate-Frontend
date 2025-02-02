import axios from "axios"
import { authorizedAxios } from "./axios.config"
import { ErrorResponse } from "./responses.types"
import { MessageResponse } from "./responses.types"

export type ApiCommentLikeButtonParams = {
    id: number
}

export type ApiCommentLikeButtonResponse = {
    message?: MessageResponse
    error?: ErrorResponse
}

export const likeCommentApi = async ({
    id
}: ApiCommentLikeButtonParams): Promise<ApiCommentLikeButtonResponse> => {
    try {
        const response = await authorizedAxios.post("/articles/comments/like", null, {
            params: {
                id: id
            },
            headers: {
                'Content-Type': 'application/json'
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