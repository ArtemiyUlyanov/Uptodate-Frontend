import { ArticleTopic } from "@/models/article_topic"
import { User } from "@/models/user"
import axios from "axios"
import { ErrorResponse } from "./error_response"

export type ApiAuthLoginParams = {
    username: string
    password: string
}

export type ApiAuthLoginResponse = {
    user?: User | undefined
    jwt_token?: string | undefined
    error?: ErrorResponse
}

export const authLoginApi = async ({
    username,
    password
}: ApiAuthLoginParams): Promise<ApiAuthLoginResponse> => {
    try {
        const response = await axios.post("/api/auth/login", {
            username: username,
            password: password
        });
    
        const user = JSON.parse(JSON.stringify(response.data.response.user));

        return {user: user, jwt_token: response.data.response.jwt_token};
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return {error: {code: error.response?.data.code, message: error.response?.data.error}}
        }

        return {user: undefined}
    }
}