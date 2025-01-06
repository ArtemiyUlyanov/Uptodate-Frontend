'use client';

import { Dispatch, SetStateAction, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { createContext } from "react";
import { UseLocalSearchResponse } from "../explore/useLocalSearch";
import DefaultInput from "@/components/inputs/DefaultInput";
import IconInput from "@/components/inputs/IconInput";
import DefaultButton from "@/components/buttons/DefaultButton";
import BlueButton from "@/components/buttons/BlueButton";
import { ApiAuthLoginParams, ApiAuthLoginResponse, authLoginApi } from "@/services/api/auth.login.endpoint";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { ErrorResponse } from "@/services/api/error_response";
import { useNotifications } from "../useNotifications";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/store/features/auth/authSlice";
import { RootState } from "@/store/store";
import clsx from "clsx";
import { useRouter } from "next/router";

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
                    setErrors(prev => ({
                        ...prev,
                        response: response.data.error?.message || ''
                    }));
                }
            });
    }, []);

    const [usernameInput, passwordInput] = useMemo(() =>
        [<DefaultInput
            placeholder='Enter your username'
            customClassName={clsx(
                'w-full',
                errors.username && 'ring-2 ring-red-500'
            )}
            inputClassName='text-base'
            fullBordered={true}
            value={username}
            handleChange={(value) => updateCredentials({username: value})}
            onInvalid={(e: React.FormEvent<HTMLInputElement>) => handleInputInvalid(e, 'username', 'Please fill out your username')}
            onInput={(e: React.FormEvent<HTMLInputElement>) => handleInput(e, 'username')}
            required
        />,
        <DefaultInput
            placeholder='Enter your password'
            customClassName={clsx(
                'w-full',
                errors.password && 'ring-2 ring-red-500'
            )}
            inputClassName='text-base'
            fullBordered={true}
            value={password}
            handleChange={(value) => updateCredentials({password: value})}
            onInvalid={(e: React.FormEvent<HTMLInputElement>) => handleInputInvalid(e, 'password', 'Please fill out your password')}
            onInput={(e: React.FormEvent<HTMLInputElement>) => handleInput(e, 'password')}
            required
        />]
    , [username, password, errors]);

    const loginButton = useMemo(() =>
        <BlueButton
            text='Sign in'
            className='font-interTight font-semibold text-base text-center rounded-md'
            type='submit'
        />
    , []);
    
    return (
        <LoginContext.Provider value={{usernameInput, passwordInput, loginButton, errors, executeLogin}}>
            {children}
        </LoginContext.Provider>
    )
}

export const useLogin = () => useContext(LoginContext);