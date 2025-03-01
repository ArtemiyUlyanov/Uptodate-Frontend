'use client';

import { logout, refresh } from "@/store/features/auth/authSlice";
import { store } from "@/store/store";
import { SortbyFilterIcon } from "@/ui/icons/SortbyFilterIcon";
import { PersonalAccountIcon } from "@/ui/icons/PersonalAccountIcon";
import { addToast } from "@heroui/toast";
import axios from "axios";

export const authorizedAxios = axios.create({
    baseURL: '/api',
    timeout: 5000,
});

authorizedAxios.interceptors.request.use(
    (config) => {
        const state = store.getState();
        const token = state.auth.access_token;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

authorizedAxios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const isAuthenticated = store.getState().auth.isAuthenticated;

        if (error.response?.status === 401 && isAuthenticated) {
            store.dispatch(logout());
            addToast({
                title: "Session timeout!",
                description: "You need to sign in again",
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

        return Promise.reject(error);
    }
);

// authorizedAxios.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         const originalRequest = error.config;

//         if (error.response?.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;

//             try {
//                 const refreshToken = store.getState().auth.refresh_token;

//                 const response = await authorizedAxios.get('/auth/refresh', {
//                     params: {
//                         refreshToken: refreshToken || ''
//                     },
//                     headers: {
//                         'Content-Type': 'application/json'
//                     }
//                 });

//                 const newAccessToken = response.data.access_token;
//                 store.dispatch(refresh(newAccessToken));

//                 originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//                 return authorizedAxios(originalRequest);
//             } catch (refreshError) {
//                 store.dispatch(logout());
//                 return Promise.reject(refreshError);
//             }
//         }

//         return Promise.reject(error);
//     }
// );