'use client';

import { ArticleLikeButton } from "@/components/articles/likes/ArticleLikeButton";
import { ArticleModel } from "@/models/article";
import { LikeIcon } from "@/ui/icons/LikeIcon";
import { UserAvatarIcon } from "@/ui/icons/UserAvatarIcon";
import { ViewsIcon } from "@/ui/icons/ViewsIcon";
import { formatDateExtended } from "@/utils/date_utils";
import { capitalizeText } from "@/utils/text_utils";
import { Divider, Image } from "@nextui-org/react";
import clsx from "clsx";
import { useMemo } from "react";
import { ArticleSharePostButton } from "./ArticleSharePostButton";
import Comments from "./comments/Comments";

export type ArticleProps = {
    article: ArticleModel
    updateData?: () => void
}

const Article: React.FC<ArticleProps> = ({
    article,
    updateData
}) => {
    const coverImage = useMemo(() => 
        <Image
            alt='test'
            className="w-full object-cover object-top aspect-[5/3]"
            radius="lg"
            src={`/api/files/get?path=articles/${article?.id}/icon.png`}
            width="100%"
        />
    , [article]);

    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-4">
                <div className={clsx(
                    'flex flex-col'
                )}>
                    <p className="font-interTight font-semibold text-primaryText text-xl">{capitalizeText(article?.heading)}</p>
                </div>
            </div>
            {coverImage}
            <div className="flex flex-col gap-6 w-full pl-4 pr-4">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-row items-center gap-8">
                        <div className={clsx(
                            'flex flex-row gap-2 items-center'
                        )}>
                            <UserAvatarIcon
                                url={`/api/files/get?path=${article?.author?.icon}`}
                                size="sm"
                                className='w-full h-full aspect-square object-cover'
                            />
                            <div className={clsx(
                                'flex flex-col h-auto'
                            )}>
                                <p className={clsx(
                                    'relative font-interTight font-semibold text text-sm text-primaryText line-clamp-1'
                                )}>{article?.author?.firstName + " " + article?.author?.lastName}</p>
                                <p className={clsx(
                                    'relative font-interTight font-medium text text-sm text-secondaryText line-clamp-1'
                                )}>@{article?.author?.username}</p>
                            </div>
                            <p className="font-interTight font-semibold text-sm text-roseText">·</p>
                            <p className="font-interTight font-medium text-sm text-roseText">{formatDateExtended(article?.createdAt || '')}</p>
                        </div>
                        <div className="flex flex-row gap-1">
                            <ArticleLikeButton article={article} updateData={updateData} />
                            <ArticleSharePostButton url={window.location.href} />
                        </div>
                    </div>
                    <div className="flex flex-row gap-4 items-center">
                        <div className="flex flex-row gap-1 items-center">
                            <div className="h-3 fill-primaryColor">
                                <LikeIcon stroked={true} />
                            </div>
                            <div className="flex flex-col items-left">
                                <p className="font-interTight font-medium text-sm text-primaryColor">{article?.likedUsernames.length}</p>
                            </div>
                        </div>
                        <div className="flex flex-row gap-1 items-center">
                            <div className="h-3 fill-primaryColor">
                                <ViewsIcon />
                            </div>
                            <div className="flex flex-col items-left">
                                <p className="font-interTight font-medium text-sm text-primaryText">{article?.views}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <Divider />
                <div>
                    {article?.parsedContent?.map(decoration => decoration.get())}
                </div>
                <Comments article={article} updateData={updateData} />
            </div>
        </div>
    );
}

export default Article;