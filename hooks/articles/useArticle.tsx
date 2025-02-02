import { ArticleModel } from "@/models/article";
import { ApiArticleRetrieveParams, ApiArticleRetrieveResponse, retrieveArticleApi } from "@/services/api/articles.retrieve.endpoint";
import { ErrorResponse } from "@/services/api/responses.types";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useArticleQuery = (
    params: ApiArticleRetrieveParams,
    opts: Partial<UseQueryOptions<ApiArticleRetrieveResponse>> = {},
) => {
    return useQuery<ApiArticleRetrieveResponse>({
      queryKey: [],
      queryFn: () => retrieveArticleApi(params),
      ...opts,
    });
}

export type UseArticleResponse = {
    article?: ArticleModel,
    error?: ErrorResponse
    refetch: () => void
}

export const useArticle = (createdAt?: string, heading?: string): UseArticleResponse => {
    const [ article, setArticle ] = useState<ArticleModel>();
    const [ error, setError ] = useState<ErrorResponse>();

    const router = useRouter();

    const { data, refetch } = useArticleQuery({
        createdAt: createdAt || '',
        heading: heading || '',
        parseContent: true
    });

    useEffect(() => {
        refetch();
    }, [heading, createdAt]);

    useEffect(() => {
        if (error) router.push('/explore');
    }, [error]);

    useEffect(() => {
        data && data.article && setArticle(data.article);
        data && data.error && setError(data.error);
    }, [data]);

    return { article: article, error: error, refetch: refetch };
};