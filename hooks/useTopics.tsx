import { ArticleTopicModel } from "@/models/article_topic";
import { ApiTopicsGetParams, ApiTopicsGetResponse, topicsGetApi } from "@/services/api/topics.get.endpoint";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";

const useTopicsQuery = (
    params: ApiTopicsGetParams,
    opts: Partial<UseQueryOptions<ApiTopicsGetResponse>> = {},
) => {
    return useQuery<ApiTopicsGetResponse>({
      queryKey: ['topics', params.parent],
      queryFn: () => topicsGetApi(params),
      ...opts,
    });
}

type TopicsContextType = {
    topics: ArticleTopicModel[]
}

const defaultContext: TopicsContextType = {
    topics: []
}

export const TopicsContext = createContext<TopicsContextType>(defaultContext);

export type TopicsProviderProps = React.HTMLProps<HTMLDivElement>

export const TopicsProvider: React.FC<TopicsProviderProps> = ({
    children
}) => {
    const [topics, setTopics] = useState<ArticleTopicModel[]>([]);
    const topicsQuery = useTopicsQuery({});

    useEffect(() => {
        topicsQuery.refetch();
    }, []);

    useEffect(() => {
        topicsQuery.data && setTopics(topicsQuery.data?.topics);
    }, [topicsQuery.data])

    return (
        <TopicsContext.Provider value={{ topics }}>
            {children}
        </TopicsContext.Provider>
    );
}

export const useTopics = () => useContext(TopicsContext);