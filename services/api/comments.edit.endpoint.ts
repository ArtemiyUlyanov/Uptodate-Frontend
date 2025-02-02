import { ArticleCommentModel } from "@/models/article_comment"
import axios from "axios"
import { authorizedAxios } from "./axios.config"
import { ErrorResponse } from "./responses.types"
import { MessageResponse } from "./responses.types"

export type ApiCommentEditParams = {
    comment: Partial<ArticleCommentModel>
    files: File[]
}

export type ApiCommentEditResponse = {
    message?: MessageResponse
    error?: ErrorResponse
}

export const editCommentApi = async ({
    comment,
    files
}: ApiCommentEditParams): Promise<ApiCommentEditResponse> => {
    try {
        const formData = new FormData();

        if (comment.id && comment.content) {
            formData.append("id", comment.id.toString());
            formData.append("content", comment.content);
        }

        files.forEach((file) => {
            formData.append("resources", file);
        });

        const response = await authorizedAxios.put("/articles/comments/edit", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    
        const message = JSON.parse(JSON.stringify(response.data));
        return {message};
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(error.response);
            return {error: {status: error.response?.data.status, message: error.response?.data.message}}
        }
        
        return {};
    }
}