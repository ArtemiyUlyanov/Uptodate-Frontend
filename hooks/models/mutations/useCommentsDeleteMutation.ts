import { queryClient } from "@/app/layout";
import { useAccount } from "@/hooks/models/useAccount";
import { ArticleModel } from "@/models/article";
import { ArticleLikeModel } from "@/models/article_like";
import { UserModel } from "@/models/user";
import { ApiArticleGetParams, ApiArticleGetResponse } from "@/services/api/articles.get.endpoint";
import { ApiArticleLikeParams, ApiArticleLikeResponse, likeArticleApi } from "@/services/api/articles.like.endpoint";
import { ApiCommentDeleteParams, ApiCommentDeleteResponse, deleteCommentApi } from "@/services/api/comments.delete.endpoint";
import { ApiCommentsGetResponse } from "@/services/api/comments.get.endpoint";
import { ApiCommentLikeParams, ApiCommentLikeResponse, likeCommentApi } from "@/services/api/comments.like.endpoint";
import { ErrorResponse } from "@/services/api/responses.types";
import { useQuery, useMutation, useQueryClient, UseMutateFunction } from "@tanstack/react-query";

export type UseCommentsDeleteMutationParams = {
    queryKey: any
}

export type UseCommentsDeleteMutationResponse = {
    mutate: UseMutateFunction<ApiCommentDeleteResponse, ErrorResponse, ApiCommentDeleteParams, unknown>
}

export const useCommentsDeleteMutation = ({ queryKey }: UseCommentsDeleteMutationParams): UseCommentsDeleteMutationResponse => {
    const { mutate } = useMutation<ApiCommentDeleteResponse, ErrorResponse, ApiCommentDeleteParams>({
        mutationFn: deleteCommentApi,
        onMutate: (variables) => {
            queryClient.setQueryData(queryKey, (oldData: ApiCommentsGetResponse | undefined) => {
                if (!oldData?.model) return oldData?.model;

                console.log('hello');
        
                return {
                  ...oldData,
                    model: oldData.model.filter(comment =>
                        comment.id !== variables.id
                    )
                }
            });  
        },
        onError: () => console.log('sddsds')
    });

    return { mutate };
}