import { UserModel } from "@/models/user"
import { ErrorResponse } from "./responses.types"
import { authorizedAxios } from "./axios.config"
import axios from "axios"

export type ApiUserGetParams = {
    id: number
}

export type ApiUserGetResponse = {
    model?: UserModel
    error?: ErrorResponse
}

export const userGetApi = async ({
    id
}: ApiUserGetParams): Promise<ApiUserGetResponse> => {
    try {
        const response = await authorizedAxios.get(`/users/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    
        const model = JSON.parse(JSON.stringify(response.data.response));
        return {model};
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return {error: {status: error.response?.data.status, message: error.response?.data.message}}
        }
        
        return {};
    }
}