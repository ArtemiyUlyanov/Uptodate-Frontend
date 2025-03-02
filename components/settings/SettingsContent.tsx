import { UserModel } from "@/models/user";
import { SettingsIcon } from "@/ui/icons/SettingsIcon";
import React from "react";
import { SettingsAccountPropertiesEditForm } from "../forms/settings/SettingsAccountPropertiesEditForm";
import DefaultLink from "@/ui/links/DefaultLink";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { UseMutateFunction } from "@tanstack/react-query";
import { ApiAccountIconUploadParams, ApiAccountIconUploadResponse } from "@/services/api/account.icon.upload.endpoint";
import { ErrorResponse } from "@/services/api/responses.types";
import { ApiAccountIconDeleteParams, ApiAccountIconDeleteResponse } from "@/services/api/account.icon.delete.endpoint";
import { ApiAccountEditParams, ApiAccountEditResponse } from "@/services/api/account.edit.endpoint";

export type SettingsContentProps = React.HTMLProps<HTMLDivElement> & {
    user?: UserModel
    isUserFetched: boolean
    uploadIconMutate: UseMutateFunction<ApiAccountIconUploadResponse, ErrorResponse, ApiAccountIconUploadParams, unknown>
    deleteIconMutate: UseMutateFunction<ApiAccountIconDeleteResponse, ErrorResponse, ApiAccountIconDeleteParams, unknown>
    editMutate: UseMutateFunction<ApiAccountEditResponse, ErrorResponse, ApiAccountEditParams, unknown>
}

export const SettingsContent: React.FC<SettingsContentProps> = ({
    user,
    isUserFetched,
    uploadIconMutate,
    deleteIconMutate,
    editMutate
}) => {
    const router = useRouter();

    return (
        <div className="flex flex-col gap-4 pl-12 pr-12 pt-8 pb-8 w-full">
            <div className="flex flex-col gap-2">
                <DefaultLink
                    text='Go back'
                    link='#'
                    onClick={() => router.back()}
                    arrowPlacement="left"
                    arrowActived={true}
                    customClassName={clsx(
                        'font-interTight font-semibold text-sm',
                        history.length <= 0 && 'hidden'
                    )}
                    actived={true}
                />
                <div className="flex flex-row items-center gap-2">
                    <div className="h-5 fill-secondaryText">
                        <SettingsIcon wrapped={true} />
                    </div>
                    <p className="font-interTight font-semibold text-lg text-primaryText">Settings</p>
                </div>
            </div>
            <SettingsAccountPropertiesEditForm user={user} isUserFetched={isUserFetched} uploadIconMutate={uploadIconMutate} deleteIconMutate={deleteIconMutate} editMutate={editMutate} />
        </div>
    );
}