import { UserModel } from "@/models/user"
import { Spinner } from "@heroui/react"
import { SettingsContent } from "./SettingsContent"
import { ApiAccountIconUploadParams, ApiAccountIconUploadResponse } from "@/services/api/account.icon.upload.endpoint"
import { ErrorResponse } from "@/services/api/responses.types"
import { UseMutateFunction } from "@tanstack/react-query"
import { ApiAccountIconDeleteParams, ApiAccountIconDeleteResponse } from "@/services/api/account.icon.delete.endpoint"
import { ApiAccountEditParams, ApiAccountEditResponse } from "@/services/api/account.edit.endpoint"
import { ApiAccountEmailConfirmParams, ApiAccountEmailConfirmResponse } from "@/services/api/account.email.confirm.endpoint"

export type SettingsProps = React.HTMLProps<HTMLDivElement> & {
    user?: UserModel
    isUserFetched: boolean
    uploadIconMutate: UseMutateFunction<ApiAccountIconUploadResponse, ErrorResponse, ApiAccountIconUploadParams, unknown>
    deleteIconMutate: UseMutateFunction<ApiAccountIconDeleteResponse, ErrorResponse, ApiAccountIconDeleteParams, unknown>
    editMutate: UseMutateFunction<ApiAccountEditResponse, ErrorResponse, ApiAccountEditParams, unknown>
    confirmEmailMutate: UseMutateFunction<ApiAccountEmailConfirmResponse, ErrorResponse, ApiAccountEmailConfirmParams, unknown>
    isEditPending: boolean
}

export const Settings: React.FC<SettingsProps> = ({
    user,
    isUserFetched,
    uploadIconMutate,
    deleteIconMutate,
    editMutate,
    confirmEmailMutate,
    isEditPending
}) => {
    return (
        (isUserFetched ?
            <SettingsContent 
                user={user} 
                isUserFetched={isUserFetched} 
                uploadIconMutate={uploadIconMutate} 
                deleteIconMutate={deleteIconMutate} 
                editMutate={editMutate}
                confirmEmailMutate={confirmEmailMutate} 
                isEditPending={isEditPending}
            />
        :
            <div className="flex flex-col gap-4 items-center justify-center w-full h-full">
                <Spinner color="secondary" />
                <p className="font-interTight font-semibold text-primaryText">Loading your data...</p>
            </div>
        )
    );
}