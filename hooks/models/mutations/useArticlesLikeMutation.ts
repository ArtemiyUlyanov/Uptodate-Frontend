import { queryClient } from "@/utils/queryClient";
import { useAccount } from "@/hooks/models/useAccount";
import { ArticleModel } from "@/models/article";
import { ArticleLikeModel } from "@/models/article_like";
import { UserModel } from "@/models/user";
import { ApiArticleGetParams, ApiArticleGetResponse, ApiArticlesGetResponse } from "@/services/api/articles.get.endpoint";
import { ApiArticleLikeParams, ApiArticleLikeResponse, likeArticleApi } from "@/services/api/articles.like.endpoint";
import { ApiCommentsGetResponse } from "@/services/api/comments.get.endpoint";
import { ApiCommentLikeParams, ApiCommentLikeResponse, likeCommentApi } from "@/services/api/comments.like.endpoint";
import { ErrorResponse } from "@/services/api/responses.types";
import { useQuery, useMutation, useQueryClient, UseMutateFunction } from "@tanstack/react-query";

export type UseArticlesLikeMutationParams = {
    queryKey: any
}

export type UseArticlesLikeMutationResponse = {
    likeMutate: UseMutateFunction<ApiArticleLikeResponse, ErrorResponse, ApiArticleLikeParams, unknown>
}

export const useArticlesLikeMutation = ({ queryKey }: UseArticlesLikeMutationParams): UseArticlesLikeMutationResponse => {
    const { mutate } = useMutation<ApiArticleLikeResponse, ErrorResponse, ApiArticleLikeParams>({
        mutationFn: likeArticleApi,
        onSuccess: (data) => {
            queryClient.setQueryData(queryKey, (oldData: ApiArticlesGetResponse | undefined) => {
                if (!oldData?.models) return oldData?.models;
        
                return {
                    ...oldData,
                    models: oldData.models.map(article =>
                        article.id === data.model?.id ? data.model : article
                    )
                }
            });
        },
        onError: () => console.log('sddsds')
    });

    return { likeMutate: mutate };
}