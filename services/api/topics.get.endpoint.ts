import { ArticleTopic } from "@/models/article_topic"
import axios from "axios"

export type ApiTopicsGetParams = {
    parent?: string
}

export type ApiTopicsGetResponse = {
    topics: ArticleTopic[]
}

export const topicsGetApi = async ({
    parent
}: ApiTopicsGetParams): Promise<ApiTopicsGetResponse> => {
    if (parent) {
        const response = await axios.get("api/articles/topics/get", {
            params: {
                parent: parent
            }
        });
        return {topics: JSON.parse(JSON.stringify(response.data.response))};
    } else {
        const response = await axios.get("api/articles/topics/get");
        return {topics: JSON.parse(JSON.stringify(response.data.response))};
    }
}