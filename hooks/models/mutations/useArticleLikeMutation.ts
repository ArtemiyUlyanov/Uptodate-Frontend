import { queryClient } from "@/app/layout";
import { useAccount } from "@/hooks/models/useAccount";
import { ArticleModel } from "@/models/article";
import { ArticleLikeModel } from "@/models/article_like";
import { UserModel } from "@/models/user";
import { ApiArticleGetParams, ApiArticleGetResponse } from "@/services/api/articles.get.endpoint";
import { ApiArticleLikeParams, ApiArticleLikeResponse, likeArticleApi } from "@/services/api/articles.like.endpoint";
import { ErrorResponse } from "@/services/api/responses.types";
import { useQuery, useMutation, useQueryClient, UseMutateFunction } from "@tanstack/react-query";

export type UseArticleLikeMutationParams = {
    queryKey: any
}

export type UseArticleLikeMutationResponse = {
    likeMutate: UseMutateFunction<ApiArticleLikeResponse, ErrorResponse, ApiArticleLikeParams, unknown>
}

export const useArticleLikeMutation = ({ queryKey }: UseArticleLikeMutationParams): UseArticleLikeMutationResponse => {
    const { mutate: likeMutate } = useMutation<ApiArticleLikeResponse, ErrorResponse, ApiArticleLikeParams>({
        mutationFn: likeArticleApi,
        onSuccess: (data) => {
            queryClient.setQueryData(queryKey, (oldData: ApiArticleGetResponse | undefined) => {
                if (!oldData) return oldData;
                return { ...oldData, model: data.model };
            });
        },
    });

    return { likeMutate };
}