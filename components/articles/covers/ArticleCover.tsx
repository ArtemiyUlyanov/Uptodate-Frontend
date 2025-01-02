import BlueButton from "@/components/buttons/BlueButton";
import { ArticleCoverIcon } from "@/components/icons/ArticleCoverIcon";
import { UserCoverIcon } from "@/components/icons/UserCoverIcon";
import { useSearch } from "@/hooks/useSearch";
import { ArticleTopic } from "@/models/article_topic";
import { User } from "@/models/user";
import user_icon_1 from "@/public/images/user_icon_1.png";
import { formatDate } from "@/utils/date_utils";
import { capitalizeText, splitQueryText, splitTextBySubtexts } from "@/utils/text_utils";
import clsx from "clsx";
import { StaticImageData } from "next/image";
import { useState } from "react";

export type ArticleCoverProps = React.HTMLProps<HTMLDivElement> & {
    heading: string
    description: string
    topics: ArticleTopic[]
    createdAt: string
    author: User | undefined
    url: string
    className?: string
}

const ArticleCover: React.FC<ArticleCoverProps> = ({
    heading,
    description,
    topics,
    url,
    createdAt,
    author,
    className
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const { query } = useSearch();

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={clsx(
                'flex flex-col-reverse sm:flex-row gap-2 relative group',
                'w-[100%] h-auto rounded-md',
                'transition-all duration-200 bg-emphasizingColor',
                'sm:hover:opacity-[0.75]',
                'active:opacity-[0.75] sm:active:opacity',
                className
            )}
        >
            <div className={clsx(
                'w-full sm:w-1/2 h-auto flex flex-col justify-start p-4 pt-0 sm:pt-4 gap-2 lg:gap-4 z-[10]',
            )}>
                <div className={clsx(
                    'w-auto flex flex-row gap-2 items-center flex-wrap overflow-hidden text-ellipsis whitespace-nowrap'
                )}>
                    <div className={clsx(
                        'flex flex-row gap-2 items-center'
                    )}>
                        <div className={clsx(
                            'relative w-10 sm:w-8 aspect-square overflow-hidden rounded-full'
                        )}>
                            <UserCoverIcon 
                                url={'/api/files/get?path=' + (author && author?.icon)}
                                className='w-full h-full object-cover'
                            />
                        </div>
                        <div className={clsx(
                            'flex flex-col w-full'
                        )}>
                            <p className={clsx(
                                'font-interTight font-medium text text-base sm:text-sm text-primaryText whitespace-nowrap'
                            )}>{author?.firstName + " " + author?.lastName}</p>
                            <p className={clsx(
                                'font-interTight font-medium text text-base sm:text-sm text-secondaryText whitespace-nowrap'
                            )}>@{splitQueryText(author?.username || '', query, 'bg-blueText text-primaryText')}</p>
                        </div>
                    </div>
                    <div className={clsx(
                        'flex flex-row gap-2',
                        'pl-2 pr-2 pt-1 pb-1 select-none',
                        'bg-blueColor rounded-full'
                    )}>
                        {/* <p className={clsx(
                            'font-interTight font-medium text text-primaryText text-sm whitespace-nowrap text-ellipsis'
                        )}>·</p> */}
                        <p className={clsx(
                            'font-interTight font-medium text text-primaryText text-xs sm:text-xs'
                        )}>{formatDate(createdAt)}</p>
                    </div>
                </div>
                
                <div className={clsx(
                    'flex flex-col h-auto gap-1'
                )}>
                    <p className={clsx(
                        'font-interTight font-medium text text-base sm:text-sm lg:text-base text-left line-clamp-2'
                    )}>{splitQueryText(capitalizeText(heading), query, 'bg-blueText text-primaryText')}</p>
                    <p className={clsx(
                        'font-interTight font-medium text text-base sm:text-sm lg:text-base text-secondaryText text-left line-clamp-3'
                    )}>{splitQueryText(capitalizeText(description), query, 'bg-blueText text-primaryText')}</p>
                </div>

                <div className={clsx(
                    'w-auto flex flex-row gap-2 items-center flex-wrap overflow-hidden text-ellipsis whitespace-nowrap'
                )}>
                    {topics.map(topic =>
                        <div className={clsx(
                            'flex flex-row pl-2 pr-2 pt-1 pb-1 select-none',
                            'border border-borderColor',
                            'rounded-full'
                        )}>
                            <p className={clsx(
                                'font-interTight font-semibold text-sm'
                            )}>{topic.name}</p>
                        </div>
                    )}
                </div>
            </div>
            <div className={clsx(
                'flex flex-col w-full p-2 sm:w-1/2',
                // "before:content-[''] before:absolute before:w-full before:h-full before:bg-gradient-to-b before:from-black/10 before:to-black/100 before:z-[5]"
            )}>
                <ArticleCoverIcon 
                    url={url}
                    className={clsx(
                        'w-full rounded',
                        // 'transition-all duration-200 z-[1]',
                        // isHovered && 'scale-105'
                    )}
                />
            </div>
        </div>
    );
}

export default ArticleCover;