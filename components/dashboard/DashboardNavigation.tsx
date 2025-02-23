import TransparentIconButton from "@/ui/buttons/TransparentIconButton";
import { DashboardIcon } from "@/ui/icons/DashboardIcon";
import { LikeIcon } from "@/ui/icons/LikeIcon";
import { addToast } from "@heroui/toast";
import clsx from "clsx";
import Link from "next/link";
import React from "react";

export type DashboardNavigationProps = React.HTMLProps<HTMLDivElement> & {
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
    optionTemplates
}) => {
    return (
        <div className="flex flex-col w-1/5 gap-2">
            <p className="font-interTight font-semibold text-primaryText">Menu</p>
            <div className={clsx(
                "flex flex-col w-full h-auto",
            )}>
                {optionTemplates.map((option) =>
                    <Link
                        href={option.link}
                        key={option.key} 
                        className={clsx(
                            "flex flex-row items-center gap-1.5",
                            "transition-all duration-200",
                            !option.selected && "fill-secondaryText text-secondaryText",
                            option.selected && "fill-primaryText text-primaryText",
                            "sm:hover:text-primaryText sm:hover:fill-primaryText"
                        )}
                    >
                        <div className={clsx(
                            "w-4 h-4"
                        )}>
                            {option.icon}
                        </div>
                        <p className={clsx(
                            'font-interTight font-semibold text-base',
                        )}>{option.text}</p>
                    </Link>
                )}
            </div>
        </div>
    );
}