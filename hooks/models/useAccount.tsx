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
      queryKey: ['isAuthenticated', params.isAuthenticated, 'access_token', params.access_token, 'refresh_token', params.refresh_token],
      queryFn: () => accountInfoApi(params),
      ...opts,
    });
}

export type UseAccountResponse = {
    user?: UserModel,
    error?: ErrorResponse
    refetch: () => void
}

export const useAccount = (): UseAccountResponse => {
    const [ user, setUser ] = useState<UserModel>();
    const [ error, setError ] = useState<ErrorResponse>();
    const [ isQueryEnabled, setIsQueryEnabled ] = useState<boolean>(false);

    const { isAuthenticated, access_token, refresh_token } = useSelector((state: RootState) => state.auth);

    const { data, refetch } = useAccountQuery({
        isAuthenticated, 
        access_token: access_token || '', 
        refresh_token: refresh_token || ''
    }, {
        enabled: isQueryEnabled
    });

    useEffect(() => {
        setIsQueryEnabled(true);

        refetch()
            .then(() => setIsQueryEnabled(false));
    }, []);

    useEffect(() => {
        data && data.user && setUser(data.user);
        data && data.error && setError(data.error);
    }, [data]);

    return { user, error, refetch };
};