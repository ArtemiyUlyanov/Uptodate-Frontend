import { UserModel } from "@/models/user";
import { accountInfoApi, ApiAccountInfoParams, ApiAccountInfoResponse } from "@/services/api/account.info.endpoint";
import { ErrorResponse } from "@/services/api/responses.types";
import { RootState } from "@/store/store";
import { UseMutateFunction, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAccountUploadIconMutation } from "./mutations/useAccountUploadIconMutation";
import { ApiAccountIconUploadParams, ApiAccountIconUploadResponse } from "@/services/api/account.icon.upload.endpoint";
import { ApiAccountIconDeleteParams, ApiAccountIconDeleteResponse } from "@/services/api/account.icon.delete.endpoint";
import { useAccountDeleteIconMutation } from "./mutations/useAccountDeleteIconMutation";
import { useAccountEditMutation } from "./mutations/useAccountEditMutation";
import { ApiAccountEditParams, ApiAccountEditResponse } from "@/services/api/account.edit.endpoint";

const useAccountQuery = (
    params: ApiAccountInfoParams,
    opts: Partial<UseQueryOptions<ApiAccountInfoResponse>> = {},
) => {
    return useQuery<ApiAccountInfoResponse>({
      queryKey: ['account', params.isAuthenticated, params.access_token],
      queryFn: () => accountInfoApi(params),
      ...opts,
    });
}

export type UseAccountResponse = {
    user?: UserModel,
    error?: ErrorResponse
    refetch: () => void
    isFetched: boolean

    uploadIconMutate: UseMutateFunction<ApiAccountIconUploadResponse, ErrorResponse, ApiAccountIconUploadParams, unknown>
    deleteIconMutate: UseMutateFunction<ApiAccountIconDeleteResponse, ErrorResponse, ApiAccountIconDeleteParams, unknown>
    editMutate: UseMutateFunction<ApiAccountEditResponse, ErrorResponse, ApiAccountEditParams, unknown>
}

export const useAccount = (): UseAccountResponse => {
    const { isAuthenticated, access_token } = useSelector((state: RootState) => state.auth);
    const { data, refetch, isFetched } = useAccountQuery(
        { isAuthenticated, access_token }
    );

    const { uploadIconMutate } = useAccountUploadIconMutation({ queryKey: ['account', isAuthenticated, access_token] });
    const { deleteIconMutate } = useAccountDeleteIconMutation({ queryKey: ['account', isAuthenticated, access_token] });
    const { editMutate } = useAccountEditMutation({ queryKey: ['account', isAuthenticated, access_token] });

    return { user: data?.model, error: data?.error, refetch, isFetched, uploadIconMutate, deleteIconMutate, editMutate };
};