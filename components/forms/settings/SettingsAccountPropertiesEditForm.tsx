import { UserModel } from "@/models/user"
import { SettingsAccountIconChangeForm } from "./SettingsAccountIconChangeForm";
import { useEffect, useState } from "react";
import { SettingsAccountNameProperty } from "./SettingsAccountNameProperty";
import DefaultButton from "@/ui/buttons/DefaultButton";
import { SettingsAccountCustomizationProperty } from "./SettingsAccountCustomizationProperty";
import { UserSettingsModel } from "@/models/user_settings";
import { UseMutateFunction, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { accountChangesAvailableApi, ApiAccountChangesAvailableParams, ApiAccountChangesAvailableResponse } from "@/services/api/account.changes_available.endpoint";
import { useDebounced } from "@/hooks/useDebounced";
import { ApiAccountIconUploadParams, ApiAccountIconUploadResponse } from "@/services/api/account.icon.upload.endpoint";
import { ErrorResponse } from "@/services/api/responses.types";
import { ApiAccountIconDeleteParams, ApiAccountIconDeleteResponse } from "@/services/api/account.icon.delete.endpoint";
import { ApiAccountEditParams, ApiAccountEditResponse } from "@/services/api/account.edit.endpoint";
import { Divider } from "@heroui/react";
import { useRouter } from "next/navigation";

export type SettingsAccountPropertiesEditFormProps = React.HTMLProps<HTMLDivElement> & {
    user?: UserModel
    isUserFetched: boolean
    uploadIconMutate: UseMutateFunction<ApiAccountIconUploadResponse, ErrorResponse, ApiAccountIconUploadParams, unknown>
    deleteIconMutate: UseMutateFunction<ApiAccountIconDeleteResponse, ErrorResponse, ApiAccountIconDeleteParams, unknown>
    editMutate: UseMutateFunction<ApiAccountEditResponse, ErrorResponse, ApiAccountEditParams, unknown>
}

const useAccountChangesAvailableQuery = (
    params: ApiAccountChangesAvailableParams,
    opts: Partial<UseQueryOptions<ApiAccountChangesAvailableResponse>> = {},
) => {
    return useQuery<ApiAccountChangesAvailableResponse>({
      queryKey: ['account-changes-available', params.username, params.email],
      queryFn: () => accountChangesAvailableApi(params),
      ...opts,
    });
}

export const SettingsAccountPropertiesEditForm: React.FC<SettingsAccountPropertiesEditFormProps> = ({
    user,
    isUserFetched,
    uploadIconMutate,
    deleteIconMutate,
    editMutate
}) => {
    const [isUserChanged, setIsUserChanged] = useState<boolean>(false);
    
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [settings, setSettings] = useState<UserSettingsModel>();

    const debouncedUsername = useDebounced<string>(username);
    const debouncedEmail = useDebounced<string>(email);

    const { data: changesAvailableData, refetch: refetchChangesAvailableData } = useAccountChangesAvailableQuery({
        username: debouncedUsername,
        email: debouncedEmail
    });

    const sendForm = () => {
        if (settings) {
            editMutate({ firstName, lastName, username: debouncedUsername, settings });
        }
    }

    useEffect(() => {
        if (isUserFetched && user !== undefined) {
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setUsername(user.username);
            setEmail(user.email);
            setSettings(user.settings);
        }
    }, [isUserFetched]);

    return (
        <div className="flex flex-col">
            <Divider />
            <SettingsAccountIconChangeForm 
                user={user} 
                uploadIconMutate={uploadIconMutate}
                deleteIconMutate={deleteIconMutate}
            />
            <Divider />
            <SettingsAccountNameProperty 
                user={user} 
                isUserChanged={isUserChanged} 
                setIsUserChanged={setIsUserChanged}
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                username={username}
                setUsername={setUsername}
                email={email}
                setEmail={setEmail}
                conflictedColumns={changesAvailableData?.conflictedColumns}
            />
            <Divider />
            <SettingsAccountCustomizationProperty 
                user={user} 
                isUserChanged={isUserChanged} 
                setIsUserChanged={setIsUserChanged}
                settings={settings}
                setSettings={setSettings}
            />
            <div>
                <DefaultButton
                    text='Save'
                    customClassName='font-interTight font-semibold text-sm text-center rounded-md'
                    onPress={sendForm}
                    isDisabled={!isUserChanged || !email || !username || !firstName || !lastName || !settings?.language || !settings.timezone || !changesAvailableData?.changesAvailable}
                    type="submit"
                    size="sm"
                />
            </div>
        </div>
    );
}