import { ArticleTopic } from "@/models/article_topic"
import { User } from "@/models/user"
import axios from "axios"
import { ErrorResponse } from "./error_response"
import { MessageResponse } from "./message_response"

export type ApiAuthLogoutParams = {
    jwt_token: string
}

export type ApiAuthLogoutResponse = {
    message?: MessageResponse
    error?: ErrorResponse
}

export const authLogoutApi = async ({
    jwt_token
}: ApiAuthLogoutParams): Promise<ApiAuthLogoutResponse> => {
    try {
        const response = await axios.post("/api/auth/logout", {}, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt_token}`
            }
        });

        return {message: {code: response.data.code, message: response.data.message}};
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return {error: {code: error.response?.data.code, message: error.response?.data.error}}
        }

        return {}
    }
}