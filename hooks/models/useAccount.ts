import { UserModel } from "@/models/user";
import { accountInfoApi, ApiAccountInfoParams, ApiAccountInfoResponse } from "@/services/api/account.info.endpoint";
import { ErrorResponse } from "@/services/api/responses.types";
import { RootState } from "@/store/store";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

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
}

export const useAccount = (): UseAccountResponse => {
    const { isAuthenticated, access_token } = useSelector((state: RootState) => state.auth);
    const { data, refetch, isFetched } = useAccountQuery(
        { isAuthenticated, access_token }
    );

    return { user: data?.model, error: data?.error, refetch, isFetched };
};