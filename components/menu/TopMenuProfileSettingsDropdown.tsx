import SelectableDropdown from "@/ui/dropdowns/SelectableDropdown";
import { LogoutIcon } from "@/ui/icons/LogoutIcon";
import { UserAvatarIcon } from "@/ui/icons/UserAvatarIcon";
import { useAccount } from "@/hooks/models/useAccount";
import { useDictionary } from "@/hooks/useDictionary";
import { RootState } from "@/store/store";
import clsx from "clsx";
import React, { useState } from "react"
import { useSelector } from "react-redux";
import { DashboardIcon } from "@/ui/icons/DashboardIcon";
import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, Skeleton, User } from "@heroui/react";
import { UnwrappingElementIcon } from "@/ui/icons/UnwrappingElementIcon";
import { SettingsIcon } from "@/ui/icons/SettingsIcon";
import { UserModel } from "@/models/user";

export type TopMenuProfileSettingsDropdownProps = {
    user?: UserModel
    isUserFetched: boolean
}

export const TopMenuProfileSettingsDropdown: React.FC<TopMenuProfileSettingsDropdownProps> = ({
    user,
    isUserFetched
}) => {
    const { language, translate } = useDictionary(user);
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    const [isOpen, setIsOpen] = useState<boolean>();

    return (
        <Dropdown
            className="relative w-auto rounded-lg bg-emphasizingColor2"
            isDisabled={!isUserFetched || user == null}
            shouldBlockScroll={false}
            onOpenChange={setIsOpen}
        >
            <DropdownTrigger
                className={clsx(
                    "w-auto text-primaryText",
                    "transition-all duration-200",
                    "sm:hover:opacity-50",
                    "active:opacity-50 sm:active:opacity"
                )}
            >
                <Skeleton isLoaded={isUserFetched && user !== undefined} className="bg-emphasizingColor2 rounded-lg">
                    <div className={clsx(
                        'flex flex-row items-center gap-2',
                        'font-interTight font-semibold'
                    )}>
                        <UserAvatarIcon
                            url={user?.icon}
                            size={undefined}
                            customClassName='w-4 h-4 rounded-full aspect-square object-cover'
                        />
                        <p className={clsx(
                            `text-sm`
                        )}>{`${user?.firstName} ${user?.lastName}`}</p>
                        <div className={clsx(
                            'h-1.5'
                        )}>
                            <UnwrappingElementIcon
                                className={clsx(
                                    'w-auto h-full fill-primaryColor',
                                    'transition-all duration-200',
                                    isOpen && 'rotate-180'
                                )}
                            />
                        </div>
                    </div>
                </Skeleton>   
            </DropdownTrigger>
            <DropdownMenu
                disallowEmptySelection
                itemClasses={{
                    title: 'font-interTight font-medium',
                    selectedIcon: 'text-aspectText',
                }}
                className="p-0"
                variant="flat"
                disabledKeys={["profile"]}
            >
                <DropdownItem
                    key='profile'
                    isReadOnly
                    classNames={{
                        base: 'opacity-100',
                        title: 'text-primaryText'
                    }}
                >
                    <User
                        avatarProps={{
                            size: "sm",
                            src: user?.icon,
                        }}
                        classNames={{
                            name: "font-interTight font-semibold text-sm text-primaryText",
                            description: "font-interTight font-medium text-xs text-secondaryText",
                        }}
                        description={`@${user?.username}`}
                        name={`${user?.firstName} ${user?.lastName}`}
                    />
                </DropdownItem>
                <DropdownItem
                    key='dashboard'
                    classNames={{
                        base: 'gap-1.5',
                        title: 'font-interTight font-semibold text-primaryText'
                    }}
                    startContent={
                        <div className="w-4 h-4 fill-secondaryColor">
                            <DashboardIcon wrapped={true} />
                        </div>
                    }
                >
                    <a href="/dashboard">{translate('common.menu.profile_dropdown.options.dashboard')}</a>
                </DropdownItem>
                <DropdownItem
                    key='settings'
                    showDivider
                    classNames={{
                        base: 'gap-1.5',
                        title: 'font-interTight font-semibold text-primaryText'
                    }}
                    startContent={
                        <div className="w-4 h-4 fill-secondaryColor">
                            <SettingsIcon wrapped={true} />
                        </div>
                    }
                >
                    <a href="/settings">{translate('common.menu.profile_dropdown.options.settings')}</a>
                </DropdownItem>
                <DropdownItem
                    key='logout'
                    classNames={{
                        base: 'gap-1.5',
                        title: 'font-interTight font-semibold text-redText'
                    }}
                    startContent={
                        <div className="w-4 h-4 fill-redColor">
                            <LogoutIcon />
                        </div>
                    }
                >
                    <a href="/logout">{translate('common.menu.profile_dropdown.options.logout')}</a>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}