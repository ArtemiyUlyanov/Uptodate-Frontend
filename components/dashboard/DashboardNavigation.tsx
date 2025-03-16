import { UserModel } from "@/models/user";
import TransparentButton from "@/ui/buttons/TransparentButton";
import { DashboardIcon } from "@/ui/icons/DashboardIcon";
import { LikeIcon } from "@/ui/icons/LikeIcon";
import { UptodateIcon } from "@/ui/icons/UptodateIcon";
import { Button, Divider, Image, Tooltip, User } from "@heroui/react";
import { addToast } from "@heroui/toast";
import clsx from "clsx";
import Link from "next/link";
import React, { useState } from "react";
import { DashboardNavigationUserDropdown } from "./DashboardNavigationUserDropdown";
import { MenuUnwrapperIcon } from "@/ui/icons/MenuUnwrapperIcon";
import DefaultButton from "@/ui/buttons/DefaultButton";
import { AddIcon } from "@/ui/icons/AddIcon";
import { DashboardNavigationSectionList } from "./DashboardNavigationSectionList";
import { ArticleModel } from "@/models/article";
import { ArticlesIcon } from "@/ui/icons/ArticlesIcon";

export type DashboardNavigationProps = React.HTMLProps<HTMLDivElement> & {
    user?: UserModel
    isUserFetched: boolean
    optionTemplates: DashboardOptionTemplate[]
    sectionTemplates: DashboardSectionTemplate[]
}

export type DashboardSectionTemplate = {
    name: string
    icon: React.ReactElement
    options: DashboardOptionTemplate[]
}

export type DashboardOptionTemplate = {
    text: string
    key: string
    icon: React.ReactElement
    selected: boolean
    link: string
}

export const getDashboardOptions = (translate: (text: string) => string, selectedKey?: 'dashboard' | 'liked-articles', ): DashboardOptionTemplate[] => {
    return [
        {
            key: 'dashboard',
            text: 'Dashboard',
            link: '/dashboard',
            selected: selectedKey === 'dashboard',
            icon: (
                <DashboardIcon className="w-4 h-auto fill-primaryColor" wrapped={false} />
            )
        },
        {
            key: 'liked-articles',
            text: 'Liked articles',
            link: '/dashboard/liked-articles',
            selected: selectedKey === 'liked-articles',
            icon: (
                <LikeIcon className="w-4 h-auto fill-primaryColor" wrapped={false} stroked={false} />
            )
        }
    ];
}

export const getDashboardSections = (translate: (text: string) => string, articles?: ArticleModel[]): DashboardSectionTemplate[] => {
    return [
        {
            name: 'Articles',
            icon: (
                <ArticlesIcon className="w-4 h-auto fill-primaryColor" />
            ),
            options: articles?.map(article => (
                {
                    key: article.slug,
                    text: article.heading,
                    link: `/${article.slug}`,
                    selected: false,
                    icon: (
                        <div className="w-6">
                            <Image
                                alt={article.heading}
                                className="w-full object-cover object-top aspect-square"
                                radius="md"
                                shadow="none"
                                disableSkeleton={false}
                                src={article.cover}
                            />
                        </div>
                    )
                }
            )) || []
        }
    ];
} 

export const DashboardNavigation: React.FC<DashboardNavigationProps> = ({
    user,
    isUserFetched,
    optionTemplates,
    sectionTemplates
}) => {
    const [isUnwrapped, setIsUnwrapped] = useState<boolean>(true);

    return (
        <div className="relative basis-1/5 bg-emphasizingColor border-r border-r-borderColor">
            <div className="sticky top-0 w-full h-[100vh]">
                <div className={clsx(
                    "flex flex-col justify-between w-full h-full gap-8 pt-5 p-3"
                )}>
                    <div className="flex flex-col gap-4 w-full">
                        <div className="flex flex-row items-center justify-between w-full">
                            {isUnwrapped && <DashboardNavigationUserDropdown user={user} isUserFetched={isUserFetched} />}
                        </div>
                        <div className="flex flex-col gap-4">
                            <Tooltip
                                content={'Click to create a new article'}
                                closeDelay={0}
                                classNames={{
                                    content: 'bg-emphasizingColor2 border border-borderColor font-interTight font-semibold text-primaryText'
                                }}
                            >
                                <DefaultButton
                                    as='a'
                                    text={'Create a new article'}
                                    customClassName='font-interTight font-semibold text-sm text-center rounded-lg'
                                    size="sm"
                                    href='/dashboard/articles/create'
                                    startContent={
                                        <div className="h-4 fill-primaryColor">
                                            <AddIcon />
                                        </div>
                                    }
                                />
                            </Tooltip>
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
                                            as='a'
                                            href={option.link}
                                            className={clsx(
                                                'justify-start pl-3 pr-3 pt-1.5 pb-1.5 h-auto gap-3 rounded-lg opacity-100',
                                                'data-[hover=true]:bg-emphasizingColor2',
                                                'transition-all duration-200',
                                                option.selected && 'bg-emphasizingColor2 text-primaryText',
                                                !option.selected && 'text-primaryText',
                                                'transition-all duration-200'
                                            )}
                                            isDisabled={option.selected}
                                            size='sm'
                                            variant='light'
                                            startContent={
                                                <div className={clsx(
                                                    option.selected && "fill-primaryColor",
                                                    !option.selected && "fill-primaryColor"
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
                                <DashboardNavigationSectionList sections={sectionTemplates} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}