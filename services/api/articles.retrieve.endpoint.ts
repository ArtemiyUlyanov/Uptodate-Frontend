import { ArticleModel } from "@/models/article"
import { parseDecoratedText } from "@/utils/decoration_utils"
import axios from "axios"
import { authorizedAxios } from "./axios.config"
import { ErrorResponse } from "./responses.types"

export type ApiArticleRetrieveParams = {
    createdAt: string
    heading: string
    parseContent?: boolean
}

export type ApiArticleRetrieveResponse = {
    article?: ArticleModel
    error?: ErrorResponse
}

export const retrieveArticleApi = async ({
    createdAt,
    heading,
    parseContent
}: ApiArticleRetrieveParams): Promise<ApiArticleRetrieveResponse> => {
    try {
        const response = await authorizedAxios.get("/articles/get", {
            params: {
                createdAt: createdAt,
                heading: heading
            },
            headers: {
                'Content-Type': 'application/json'
            }
        });
    
        const article = JSON.parse(JSON.stringify(response.data.response));
        const parsedContent = parseContent && parseDecoratedText(article.content);

        return {article: {...article, parsedContent: parsedContent}};
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return {error: {status: error.response?.data.status, message: error.response?.data.message}}
        }
        
        return {};
    }
}