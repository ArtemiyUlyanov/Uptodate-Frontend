import { ArticleCoverIcon } from "@/components/icons/ArticleCoverIcon";
import { UserAvatarIcon } from "@/components/icons/UserAvatarIcon";
import { useSearch } from "@/hooks/explore/useSearch";
import { ArticleTopic } from "@/models/article_topic";
import { User } from "@/models/user";
import user_icon_1 from "@/public/images/user_icon_1.png";
import { formatDate } from "@/utils/date_utils";
import { capitalizeText, splitQueryText, splitTextBySubtexts } from "@/utils/text_utils";
import { Avatar, Card, CardBody, CardFooter, CardHeader, Chip, Image } from "@nextui-org/react";
import clsx from "clsx";
import { StaticImageData } from "next/image";
import { useState } from "react";

export type ArticleCoverProps = React.HTMLProps<HTMLDivElement> & {
    heading: string
    description: string
    topics: ArticleTopic[]
    createdAt: string
    query?: string
    author: User | undefined
    url: string
    className?: string
}

export const ArticleCover: React.FC<ArticleCoverProps> = ({
    heading,
    description,
    topics,
    url,
    query,
    createdAt,
    author,
    className
}) => {
    return (
        <Card isPressable shadow="sm">
            <CardBody className="overflow-visible p-0">
                <Image
                    alt={heading}
                    className="w-full object-cover object-top aspect-video"
                    radius="lg"
                    shadow="sm"
                    disableSkeleton={false}
                    src={url}
                    width="100%"
                />
            </CardBody>
            <CardFooter className="justify-between">
                <div className={clsx(
                    'flex flex-col gap-1'
                )}>
                    <div className={clsx(
                        'flex flex-row gap-2 items-center'
                    )}>
                        <UserAvatarIcon 
                            url={'/api/files/get?path=' + (author && author?.icon)}
                            size="sm"
                            className='w-full h-full aspect-square object-cover'
                        />
                        <div className={clsx(
                            'flex flex-col h-auto'
                        )}>
                            <p className={clsx(
                                'relative font-interTight font-semibold text text-sm text-primaryText line-clamp-1'
                            )}>{author?.firstName + " " + author?.lastName}</p>
                            <p className={clsx(
                                'relative font-interTight font-medium text text-sm text-secondaryText line-clamp-1'
                            )}>@{splitQueryText(author?.username || '', query || '', 'bg-redText text-primaryText')}</p>
                        </div>
                    </div>
                    <div className={clsx(
                        'flex flex-col gap-1'
                    )}>
                        <p className="font-interTight font-semibold text-sm line-clamp-2">{splitQueryText(capitalizeText(heading), query || '', 'bg-redText text-primaryText')}</p>
                        <p className="font-interTight font-medium text-secondaryText text-sm line-clamp-2">{splitQueryText(description, query || '', 'bg-redText text-primaryText')}</p>
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
}

export default ArticleCover;