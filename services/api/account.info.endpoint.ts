import { UserModel } from "@/models/user"
import { ErrorResponse } from "./responses.types"
import { authorizedAxios } from "./axios.config"
import axios from "axios"

export type ApiAccountInfoParams = {
    isAuthenticated: boolean
    access_token: string
    refresh_token: string
}

export type ApiAccountInfoResponse = {
    user?: UserModel
    error?: ErrorResponse
}

export const accountInfoApi = async ({
}: ApiAccountInfoParams): Promise<ApiAccountInfoResponse> => {
    try {
        const response = await authorizedAxios.get("/account/info", {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    
        const user = JSON.parse(JSON.stringify(response.data.response));

        return {user};
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return {error: {status: error.response?.data.status, message: error.response?.data.message}}
        }
        
        return {};
    }
}