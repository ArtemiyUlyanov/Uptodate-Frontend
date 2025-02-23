import { ArticleModel } from "@/models/article"
import { ApiArticleGetParams, ApiArticleGetResponse, getArticleApi } from "@/services/api/articles.get.endpoint"
import { QueryObserverResult, RefetchOptions, UseMutateFunction, useQuery, UseQueryOptions } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { useArticleLikeMutation } from "./mutations/useArticleLikeMutation"
import { ApiArticleLikeParams, ApiArticleLikeResponse } from "@/services/api/articles.like.endpoint"
import { ErrorResponse } from "@/services/api/responses.types"
import { useRouter } from "next/navigation"
import { useAccount } from "./useAccount"

export type UseArticleParams = {
    id?: number
    slug?: string
}

export type UseArticleResponse = {
    article?: ArticleModel | undefined
    error?: ErrorResponse
    refetch: () => Promise<QueryObserverResult<ApiArticleGetResponse, Error>>
    likeMutate: UseMutateFunction<ApiArticleLikeResponse, ErrorResponse, ApiArticleLikeParams, unknown>
}

const useArticleQuery = (
    params: ApiArticleGetParams,
    opts: Partial<UseQueryOptions<ApiArticleGetResponse>> = {},
) => {
    return useQuery<ApiArticleGetResponse>({
        queryKey: ['article', params.id, params.slug],
        queryFn: () => getArticleApi(params),
        ...opts,
    });
}

export const useArticle = ({
    id,
    slug
}: UseArticleParams): UseArticleResponse => {
    const { user } = useAccount();
    const { data, refetch } = useArticleQuery({ id, slug });
    const { likeMutate } = useArticleLikeMutation({ queryKey: ['article', id, slug] });

    useEffect(() => {
        refetch();
    }, [user]);

    return { article: data?.model, error: data?.error, refetch, likeMutate };
}