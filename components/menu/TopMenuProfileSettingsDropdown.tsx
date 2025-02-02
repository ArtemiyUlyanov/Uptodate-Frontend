import DefaultDropdown from "@/ui/dropdowns/DefaultDropdown";
import { AccountIcon } from "@/ui/icons/AccountIcon";
import { LogoutIcon } from "@/ui/icons/LogoutIcon";
import { UserAvatarIcon } from "@/ui/icons/UserAvatarIcon";
import { useAccount } from "@/hooks/account/useAccount";
import { useDictionary } from "@/hooks/useDictionary";
import { RootState } from "@/store/store";
import clsx from "clsx";
import React from "react"
import { useSelector } from "react-redux";

export type TopMenuProfileSettingsDropdownProps = {

}

export const TopMenuProfileSettingsDropdown: React.FC<TopMenuProfileSettingsDropdownProps> = ({

}) => {
    const { language } = useDictionary();
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    const { user } = useAccount();

    return (
        <DefaultDropdown
            componentSize={'sm'}
            name={`${user?.firstName} ${user?.lastName}`}
            icon={
                <UserAvatarIcon 
                    url={'/api/files/get?path=' + (user?.icon)}
                    size={undefined}
                    customClassName='w-4 rounded-full aspect-square object-cover'
                />
            }
            options={[
                {
                    name: "My account",
                    classNames: {title: 'text-primaryText'},
                    icon: (
                        <div className={clsx(
                            'w-3'
                        )}>
                            <AccountIcon />
                        </div>
                    ),
                    props: {href: '/profile'}
                },
                {
                    name: "Log out",
                    classNames: {title: 'text-redText'},
                    icon: (
                        <div className={clsx(
                            'w-3'
                        )}>
                            <LogoutIcon />
                        </div>
                    ),
                    props: {href: '/logout'}
                }
            ]}
        />
    );
}