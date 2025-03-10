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
import { logout } from "@/store/features/auth/authSlice";
import { store } from "@/store/store";
import { CheckmarkIcon } from "@/ui/icons/CheckmarkIcon";
import { CloseIcon } from "@/ui/icons/CloseIcon";
import { LikeIcon } from "@/ui/icons/LikeIcon";
import { PersonalAccountIcon } from "@/ui/icons/PersonalAccountIcon";
import { TrashIcon } from "@/ui/icons/TrashIcon";
import { queryClient } from "@/utils/queryClient";
import { addToast } from "@heroui/toast";
import { useQuery, useMutation, useQueryClient, UseMutateFunction } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

export type UseAccountDeleteIconMutationParams = {
    queryKey: any
}

export type UseAccountDeleteIconMutationResponse = {
    editMutate: UseMutateFunction<ApiAccountEditResponse, ErrorResponse, ApiAccountEditParams, unknown>
    isEditPending: boolean
}

export const useAccountEditMutation = ({ queryKey }: UseAccountDeleteIconMutationParams): UseAccountDeleteIconMutationResponse => {
    const dispatch = useDispatch();

    const { mutate: editMutate, isPending: isEditPending } = useMutation<ApiAccountEditResponse, ErrorResponse, ApiAccountEditParams>({
        mutationFn: accountEditApi,
        onSuccess: (data) => {
            if (data.model) {
                queryClient.setQueryData(queryKey, (oldData: ApiAccountInfoResponse | undefined) => {
                    if (!oldData) return oldData;

                    if (oldData.model?.username !== data.model?.username) {
                        setTimeout(() => dispatch(logout()), 3000);
                        addToast({
                            title: "Oops, Session Lost!",
                            description: "Looks like you changed your common authentication credentials so you need to auth again 🔐👋",
                            classNames: {
                                title: 'font-interTight font-semibold text-primaryText',
                                icon: 'h-4 fill-primaryColor',
                                description: 'font-interTight font-medium text-secondaryText',
                                base: 'bg-emphasizingColor2 border-borderColor'
                            },
                            icon: (
                                <PersonalAccountIcon />
                            )
                        });
                    }

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
            } else {
                addToast({
                    title: "Something went wrong",
                    description: "Unable to edit profile ❌",
                    classNames: {
                        title: 'font-interTight font-semibold text-primaryText',
                        icon: 'h-4 fill-redColor',
                        description: 'font-interTight font-medium text-secondaryText',
                        base: 'bg-emphasizingColor2 border-borderColor'
                    },
                    icon: (
                        <CloseIcon />
                    )
                });
            }
        },
    });

    return { editMutate, isEditPending };
}