import { Article } from "@/models/article";
import { ArticleTopic } from "@/models/article_topic";
import { ApiTopicsGetParams, ApiTopicsGetResponse, topicsGetApi } from "@/services/api/topics.get.endpoint";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useContext, useState, createContext, useEffect } from "react";

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
    topics: ArticleTopic[]
}

const defaultContext: TopicsContextType = {
    topics: []
}

export const TopicsContext = createContext<TopicsContextType>(defaultContext);

export type TopicsProviderProps = React.HTMLProps<HTMLDivElement>

export const TopicsProvider: React.FC<TopicsProviderProps> = ({
    children
}) => {
    const [topics, setTopics] = useState<ArticleTopic[]>([]);
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