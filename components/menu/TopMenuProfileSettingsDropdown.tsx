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
import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, User } from "@nextui-org/react";
import { UnwrappingElementIcon } from "@/ui/icons/UnwrappingElementIcon";
import { SettingsIcon } from "@/ui/icons/SettingsIcon";

export type TopMenuProfileSettingsDropdownProps = {

}

export const TopMenuProfileSettingsDropdown: React.FC<TopMenuProfileSettingsDropdownProps> = ({

}) => {
    const { language, translate } = useDictionary();
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    const { user } = useAccount();

    const [isOpen, setIsOpen] = useState<boolean>();

    return (
        <Dropdown
            className="relative w-auto"
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
            </DropdownTrigger>
            <DropdownMenu
                disallowEmptySelection
                itemClasses={{
                    title: 'font-interTight font-medium',
                    selectedIcon: "text-roseText",
                }}
                variant="flat"
                disabledKeys={["profile"]}
            >
                <DropdownSection 
                    showDivider 
                    key={0}
                    aria-label="Profile & Actions"
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
                                name: "font-interTight font-semibold text-primaryText",
                                description: "font-interTight font-medium text-secondaryText",
                            }}
                            description={`@${user?.username}`}
                            name={`${user?.firstName} ${user?.lastName}`}
                        />
                    </DropdownItem>
                    <DropdownItem
                        as='a'
                        href="/dashboard"
                        key='dashboard'
                        classNames={{
                            base: 'gap-1.5',
                            title: 'font-interTight font-medium text-primaryText'
                        }}
                        startContent={
                            <div className="w-5 h-5 fill-secondaryColor">
                                <DashboardIcon />
                            </div>
                        }
                    >
                        {translate('common.menu.profile_dropdown.options.dashboard')}
                    </DropdownItem>
                    <DropdownItem
                        as='a'
                        key='settings'
                        href="/dashboard/settings"
                        classNames={{
                            base: 'gap-1.5',
                            title: 'font-interTight font-medium text-primaryText'
                        }}
                        startContent={
                            <div className="w-5 h-5 fill-secondaryColor">
                                <SettingsIcon wrapped={true} />
                            </div>
                        }
                    >
                        {translate('common.menu.profile_dropdown.options.settings')}
                    </DropdownItem>
                </DropdownSection>
                <DropdownSection 
                    key={1}
                    aria-label="Logout"
                >
                    <DropdownItem
                        as='a'
                        key='logout'
                        href="/logout"
                        classNames={{
                            base: 'gap-1.5',
                            title: 'font-interTight font-medium text-redText'
                        }}
                        startContent={
                            <div className="w-5 h-5 fill-redColor">
                                <LogoutIcon />
                            </div>
                        }
                    >
                        {translate('common.menu.profile_dropdown.options.logout')}
                    </DropdownItem>
                </DropdownSection>
            </DropdownMenu>
        </Dropdown>
    );
}