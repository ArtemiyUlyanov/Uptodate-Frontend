import { queryClient } from "@/app/layout";
import { useAccount } from "@/hooks/account/useAccount";
import { ArticleModel } from "@/models/article";
import { ArticleLikeModel } from "@/models/article_like";
import { UserModel } from "@/models/user";
import { ApiArticleGetParams, ApiArticleGetResponse } from "@/services/api/articles.get.endpoint";
import { ApiArticleLikeParams, ApiArticleLikeResponse, likeArticleApi } from "@/services/api/articles.like.endpoint";
import { ApiSearchResponse } from "@/services/api/articles.search.endpoint";
import { ErrorResponse } from "@/services/api/responses.types";
import { useQuery, useMutation, useQueryClient, UseMutateFunction } from "@tanstack/react-query";

export type UseSearchLikeMutationParams = {
    queryKey: any
}

export type UseSearchLikeMutationResponse = {
    mutate: UseMutateFunction<ApiArticleLikeResponse, ErrorResponse, ApiArticleLikeParams, unknown>
}

export const useSearchLikeMutation = ({ queryKey }: UseSearchLikeMutationParams): UseSearchLikeMutationResponse => {
    const { user } = useAccount();

    const { mutate } = useMutation<ApiArticleLikeResponse, ErrorResponse, ApiArticleLikeParams>({
        mutationFn: likeArticleApi,
        onSuccess: (data) => {
            queryClient.setQueryData(queryKey, (oldData: ApiSearchResponse | undefined) => {
                if (!oldData?.articles) return oldData;
        
                return {
                    ...oldData,
                    articles: oldData.articles.map(article =>
                        article.id === data.model?.id ? data.model : article
                    ),
                };
            });
        },
    });

    return { mutate };
}