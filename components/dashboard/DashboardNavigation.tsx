import { UserModel } from "@/models/user";
import TransparentIconButton from "@/ui/buttons/TransparentIconButton";
import { DashboardIcon } from "@/ui/icons/DashboardIcon";
import { LikeIcon } from "@/ui/icons/LikeIcon";
import { UptodateIcon } from "@/ui/icons/UptodateIcon";
import { Button, Tooltip, User } from "@heroui/react";
import { addToast } from "@heroui/toast";
import clsx from "clsx";
import Link from "next/link";
import React from "react";
import { DashboardNavigationSettingsDropdown } from "./DashboardNavigationSettingsDropdown";

export type DashboardNavigationProps = React.HTMLProps<HTMLDivElement> & {
    user?: UserModel
    isUserFetched: boolean
    optionTemplates: DashboardOption[]
}

export type DashboardOption = {
    text: string
    key: string
    icon: React.ReactElement
    selected: boolean
    link: string
}

export const getDashboardOptions = (translate: (text: string) => string, selectedKey: 'dashboard' | 'liked', ): DashboardOption[] => {
    return [
        {
            key: 'dashboard',
            text: 'Dashboard',
            link: '/dashboard',
            selected: selectedKey === 'dashboard',
            icon: (
                <DashboardIcon wrapped={true} />
            )
        },
        {
            key: 'liked',
            text: 'Liked articles',
            link: '/dashboard/liked',
            selected: selectedKey === 'liked',
            icon: (
                <LikeIcon wrapped={true} stroked={false} />
            )
        }
    ];
}

export const DashboardNavigation: React.FC<DashboardNavigationProps> = ({
    user,
    isUserFetched,
    optionTemplates
}) => {
    return (
        <div className="sticky top-0 w-full h-[100vh]">
            <div className={clsx(
                "flex flex-col justify-between w-full h-full gap-8 p-3"
            )}>
                <div className="flex flex-col gap-4">
                    <div className="pt-4 pl-2 pr-2 pb-2">
                        <div className="flex flex-row justify-start h-5 fill-primaryText">
                            <Link
                                href="/explore" 
                                className={clsx(
                                    'fill-primaryText',
                                    'w-auto',
                                    'hover:opacity-50',
                                    'active:hover:opacity-50 sm:active:hover'
                                )}
                            >
                                <UptodateIcon />
                            </Link>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        {/* <p className="font-interTight font-semibold text-primaryText">Menu</p> */}
                        <div className={clsx(
                            "flex flex-col gap-2 w-full h-auto",
                        )}>
                            {optionTemplates.map((option, index) =>
                                <Tooltip
                                    key={index}
                                    content={'Click to go'}
                                    closeDelay={0}
                                    classNames={{
                                        content: 'bg-emphasizingColor2 border border-borderColor font-interTight font-semibold text-primaryText'
                                    }}
                                >
                                    <Button
                                        className={clsx(
                                            'justify-start pl-4 pr-4 pt-2 pb-2 h-auto gap-2 rounded-lg opacity-100',
                                            'transition-all duration-200',
                                            option.selected && 'bg-emphasizingColor2 text-primaryText',
                                            !option.selected && 'text-primaryText',
                                            'sm:hover:bg-emphasizingColor2',
                                            'active:bg-emphasizingColor2 sm:active:bg',
                                            'transition-all duration-200'
                                        )}
                                        isDisabled={option.selected}
                                        size='sm'
                                        variant='light'
                                        startContent={
                                            <div className={clsx(
                                                "h-5",
                                                option.selected && "fill-secondaryColor",
                                                !option.selected && "fill-secondaryColor"
                                            )}>
                                                {option.icon}
                                            </div>
                                        }
                                    >
                                        <p className={clsx(
                                            'font-interTight font-semibold text-sm',
                                        )}>{option.text}</p>
                                    </Button>
                                </Tooltip>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full">
                    <DashboardNavigationSettingsDropdown user={user} isUserFetched={isUserFetched} />
                </div>
            </div>
        </div>
    );
}