'use client';

import { Dispatch, SetStateAction, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { createContext } from "react";
import { UseLocalSearchResponse } from "../explore/useLocalSearch";
import DefaultInput from "@/components/inputs/DefaultInput";
import IconInput from "@/components/inputs/IconInput";
import DefaultButton from "@/components/buttons/DefaultButton";
import { ApiAuthLoginParams, ApiAuthLoginResponse, authLoginApi } from "@/services/api/auth.login.endpoint";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { ErrorResponse } from "@/services/api/error_response";
import { useNotifications } from "../useNotifications";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/store/features/auth/authSlice";
import { RootState } from "@/store/store";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useDictionary } from "../useDictionary";

const useAuthLoginQuery = (
    params: ApiAuthLoginParams,
    opts: Partial<UseQueryOptions<ApiAuthLoginResponse>> = {},
) => {
    return useQuery<ApiAuthLoginResponse>({
      queryKey: ['credentials'],
      queryFn: () => authLoginApi(params),
      ...opts,
    });
}

type LoginContextType = {
    usernameInput: React.ReactNode
    passwordInput: React.ReactNode
    loginButton: React.ReactNode
    errors: Record<string, string>
    executeLogin: () => void
}

const defaultContext: LoginContextType = {
    usernameInput: undefined,
    passwordInput: undefined,
    loginButton: undefined,
    errors: {},
    executeLogin: () => {}
}

export const LoginContext = createContext<LoginContextType>(defaultContext);

export type LoginProviderProps = React.HTMLProps<HTMLDivElement>

export const LoginProvider: React.FC<LoginProviderProps> = ({
    children
}) => {
    const dispatch = useDispatch();
    const { dictionary, translate } = useDictionary();
    
    const [{ username, password }, setCredentials] = useState({
        username: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        username: '',
        password: '',
        response: ''
    });

    const authLoginQuery = useAuthLoginQuery({username: username || '', password: password || ''});

    const updateCredentials = useCallback((credentials: Partial<{username: string, password: string}>) => {
        setCredentials(prev => ({
            ...prev,
            ...credentials    
        }));
    }, []);

    const handleInputInvalid = (e: React.FormEvent<HTMLInputElement>, field: string, text: string) => {
        e.preventDefault();
        setErrors(prev => ({
            ...prev,
            [field]: text
        }));
    }

    const handleInput = (e: React.FormEvent<HTMLInputElement>, field: string) => {
        setErrors(prev => ({
                ...prev,
                response: '',
                [field]: ''
            })
        );
    }

    const executeLogin = useCallback(() => {
        authLoginQuery.refetch()
            .then((response) => {
                if (response.data?.user) {
                    dispatch(setUser({user: response.data.user, token: response.data.jwt_token, isAuthenticated: true}));
                }
        
                if (response.data?.error) {
                    const auth_error_code = response.data.error?.code;
                    let error: string = translate('common.login.unknown_error');

                    if (auth_error_code === 10) {
                        error = translate('common.login.errors.user_invalid');
                    }

                    setErrors(prev => ({
                        ...prev,
                        response: error
                    }));
                }
            });
    }, [dictionary, translate]);

    const [usernameInput, passwordInput] = useMemo(() =>
        [<DefaultInput
            placeholder={translate('common.login.fields.username.input_placeholder')}
            customClassName={clsx(
                'w-full',
                errors.username && 'ring-2 ring-red-500/50',
                errors.username && 'border-red-500'
            )}
            inputClassName='text-base'
            fullBordered={true}
            value={username}
            handleChange={(value) => updateCredentials({username: value})}
            onInvalid={(e: React.FormEvent<HTMLInputElement>) => handleInputInvalid(e, 'username', translate('common.login.errors.username_field_incorrect'))}
            onInput={(e: React.FormEvent<HTMLInputElement>) => handleInput(e, 'username')}
            required
        />,
        <DefaultInput
            placeholder={translate('common.login.fields.password.input_placeholder')}
            customClassName={clsx(
                'w-full',
                errors.password && 'ring-2 ring-red-500/50',
                errors.password && 'border-red-500'
            )}
            inputClassName='text-base'
            fullBordered={true}
            value={password}
            handleChange={(value) => updateCredentials({password: value})}
            onInvalid={(e: React.FormEvent<HTMLInputElement>) => handleInputInvalid(e, 'password', translate('common.login.errors.password_field_incorrect'))}
            onInput={(e: React.FormEvent<HTMLInputElement>) => handleInput(e, 'password')}
            type="password"
            required
        />]
    , [username, password, errors, dictionary]);

    const loginButton = useMemo(() =>
        <DefaultButton
            text={translate('common.login.login_form_sign_in_button')}
            customClassName='font-interTight font-semibold text-base text-center rounded-md'
            type='submit'
        />
    , [dictionary]);
    
    return (
        <LoginContext.Provider value={{usernameInput, passwordInput, loginButton, errors, executeLogin}}>
            {children}
        </LoginContext.Provider>
    )
}

export const useLogin = () => useContext(LoginContext);