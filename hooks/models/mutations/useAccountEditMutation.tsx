import { useAccount } from "@/hooks/models/useAccount";
import { ArticleModel } from "@/models/article";
import { ArticleLikeModel } from "@/models/article_like";
import { UserModel } from "@/models/user";
import { accountEditApi, ApiAccountEditParams, ApiAccountEditResponse } from "@/services/api/account.edit.endpoint";
import { accountDeleteIconApi, ApiAccountIconDeleteParams, ApiAccountIconDeleteResponse } from "@/services/api/account.icon.delete.endpoint";
import { accountUploadIconApi, ApiAccountIconUploadParams, ApiAccountIconUploadResponse } from "@/services/api/account.icon.upload.endpoint";
import { ApiAccountInfoResponse } from "@/services/api/account.info.endpoint";
import { ApiArticleGetParams, ApiArticleGetResponse } from "@/services/api/articles.get.endpoint";
import { ApiArticleLikeParams, ApiArticleLikeResponse, likeArticleApi } from "@/services/api/articles.like.endpoint";
import { ErrorResponse } from "@/services/api/responses.types";
import { CheckmarkIcon } from "@/ui/icons/CheckmarkIcon";
import { LikeIcon } from "@/ui/icons/LikeIcon";
import { TrashIcon } from "@/ui/icons/TrashIcon";
import { queryClient } from "@/utils/queryClient";
import { addToast } from "@heroui/toast";
import { useQuery, useMutation, useQueryClient, UseMutateFunction } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export type UseAccountDeleteIconMutationParams = {
    queryKey: any
}

export type UseAccountDeleteIconMutationResponse = {
    editMutate: UseMutateFunction<ApiAccountEditResponse, ErrorResponse, ApiAccountEditParams, unknown>
}

export const useAccountEditMutation = ({ queryKey }: UseAccountDeleteIconMutationParams): UseAccountDeleteIconMutationResponse => {
    const router = useRouter();

    const { mutate: editMutate } = useMutation<ApiAccountEditResponse, ErrorResponse, ApiAccountEditParams>({
        mutationFn: accountEditApi,
        onSuccess: (data) => {
            queryClient.setQueryData(queryKey, (oldData: ApiAccountInfoResponse | undefined) => {
                if (!oldData) return oldData;
                return { ...oldData, model: data.model };
            });

            addToast({
                title: "Account updated — you're evolving! 🔄",
                description: "A few tweaks here, a few tweaks there... and boom! The upgraded you is now live. 🚀",
                classNames: {
                    title: 'font-interTight font-semibold text-primaryText',
                    icon: 'h-4 fill-green-500',
                    description: 'font-interTight font-medium text-secondaryText',
                    base: 'bg-emphasizingColor2 border-borderColor'
                },
                icon: (
                    <CheckmarkIcon />
                )
            });
        },
    });

    return { editMutate };
}