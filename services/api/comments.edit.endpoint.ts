import { CommentModel } from "@/models/comment"
import axios from "axios"
import { authorizedAxios } from "./axios.config"
import { ErrorResponse } from "./responses.types"
import { MessageResponse } from "./responses.types"

export type ApiCommentEditParams = {
    id: number
    content: string
    resources: File[]
}

export type ApiCommentEditResponse = {
    message?: MessageResponse
    error?: ErrorResponse
}

export const editCommentApi = async ({
    id,
    content,
    resources
}: ApiCommentEditParams): Promise<ApiCommentEditResponse> => {
    try {
        const formData = new FormData();

        formData.append("content", content);

        resources.forEach((file) => {
            formData.append("resources", file);
        });

        const response = await authorizedAxios.put(`/comments/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
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