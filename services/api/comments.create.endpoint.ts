import { ArticleCommentModel } from "@/models/article_comment"
import axios from "axios"
import { authorizedAxios } from "./axios.config"
import { ErrorResponse } from "./responses.types"
import { MessageResponse } from "./responses.types"

export type ApiCommentCreateParams = {
    comment: Partial<ArticleCommentModel>
    files: File[]
}

export type ApiCommentCreateResponse = {
    message?: MessageResponse
    error?: ErrorResponse
}

export const createCommentApi = async ({
    comment,
    files
}: ApiCommentCreateParams): Promise<ApiCommentCreateResponse> => {
    try {
        const formData = new FormData();

        if (comment.content && comment.article?.id) {
            formData.append("content", comment.content);
            formData.append("articleId", comment.article?.id.toString());
        }

        files.forEach((file) => {
            formData.append("resources", file);
        });

        const response = await authorizedAxios.post("/articles/comments/create", formData, {
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