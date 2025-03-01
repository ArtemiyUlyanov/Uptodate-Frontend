import { queryClient } from "@/utils/queryClient";
import { useAccount } from "@/hooks/models/useAccount";
import { ArticleModel } from "@/models/article";
import { ArticleLikeModel } from "@/models/article_like";
import { UserModel } from "@/models/user";
import { ApiArticleGetParams, ApiArticleGetResponse } from "@/services/api/articles.get.endpoint";
import { ApiArticleLikeParams, ApiArticleLikeResponse, likeArticleApi } from "@/services/api/articles.like.endpoint";
import { ApiCommentsGetResponse } from "@/services/api/comments.get.endpoint";
import { ApiCommentLikeParams, ApiCommentLikeResponse, likeCommentApi } from "@/services/api/comments.like.endpoint";
import { ErrorResponse } from "@/services/api/responses.types";
import { useQuery, useMutation, useQueryClient, UseMutateFunction } from "@tanstack/react-query";

export type UseCommentsLikeMutationParams = {
    queryKey: any
}

export type UseCommentsLikeMutationResponse = {
    likeMutate: UseMutateFunction<ApiCommentLikeResponse, ErrorResponse, ApiCommentLikeParams, unknown>
}

export const useCommentsLikeMutation = ({ queryKey }: UseCommentsLikeMutationParams): UseCommentsLikeMutationResponse => {
    const { mutate } = useMutation<ApiCommentLikeResponse, ErrorResponse, ApiCommentLikeParams>({
        mutationFn: likeCommentApi,
        onSuccess: (data) => {
            queryClient.setQueryData(queryKey, (oldData: ApiCommentsGetResponse | undefined) => {
                if (!oldData?.model) return oldData?.model;
        
                return {
                    ...oldData,
                    model: oldData.model.map(comment =>
                        comment.id === data.model?.id ? data.model : comment
                    )
                }
            });
        },
        onError: () => console.log('sddsds')
    });

    return { likeMutate: mutate };
}