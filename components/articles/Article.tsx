'use client';

import { ArticleLikeButton } from "@/components/articles/likes/ArticleLikeButton";
import { ArticleModel } from "@/models/article";
import { LikeIcon } from "@/ui/icons/LikeIcon";
import { UserAvatarIcon } from "@/ui/icons/UserAvatarIcon";
import { ViewsIcon } from "@/ui/icons/ViewsIcon";
import { formatDate, formatDateExtended } from "@/utils/date_utils";
import { capitalizeText } from "@/utils/text_utils";
import { BreadcrumbItem, Breadcrumbs, Divider, Image } from "@nextui-org/react";
import clsx from "clsx";
import { useEffect, useMemo } from "react";
import { ArticleSharePostButton } from "./ArticleSharePostButton";
import Comments from "./comments/Comments";
import { useRetrieve } from "@/hooks/useRetrieve";
import { UserModel } from "@/models/user";
import { parseDecoratedText } from "@/utils/decoration_utils";
import { UseMutateFunction } from "@tanstack/react-query";
import { ApiArticleLikeParams, ApiArticleLikeResponse } from "@/services/api/articles.like.endpoint";
import { ErrorResponse } from "@/services/api/responses.types";

export type ArticleProps = {
    article: ArticleModel
    likeMutate?: UseMutateFunction<ApiArticleLikeResponse, ErrorResponse, ApiArticleLikeParams, unknown>
}

const Article: React.FC<ArticleProps> = ({
    article,
    likeMutate
}) => {
    const coverImage = useMemo(() => 
        <Image
            alt='test'
            className="w-full object-cover object-top aspect-[5/3]"
            radius="lg"
            src={article.cover}
            width="100%"
        />
    , [article]);

    const [author] = useRetrieve<UserModel>(
        article,
        {
            endpoint: '/users/%author_id%',
            pathVariables: {
                author_id: article.authorId
            },
            payload: {}
        }
    );

    return (
        <div className="flex flex-col items-center gap-4 w-full">
            <div className="flex flex-col gap-10 w-3/4">
                <div className="w-full">
                    <Breadcrumbs
                        itemClasses={{
                            item: 'font-interTight font-semibold text-sm'
                        }}
                    >
                        <BreadcrumbItem href="/explore">Explore</BreadcrumbItem>
                        <BreadcrumbItem>{capitalizeText(article?.heading || '')}</BreadcrumbItem>
                    </Breadcrumbs>
                </div>
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2 w-full">
                        <p className="font-interTight font-semibold text-roseText text-sm">{formatDate(article.createdAt)}</p>
                        <p className="font-interTight font-semibold text-primaryText text-xl">{capitalizeText(article?.heading)}</p>
                        <p className="font-interTight font-medium text-secondaryText text-base">{article.description}</p>
                    </div>
                    <div className={clsx(
                        "flex flex-row justify-between w-full items-center gap-8",
                        "pt-3 border border-[transparent] border-t-borderColor"
                    )}>
                        <div className={clsx(
                            'flex flex-row gap-4 items-center'
                        )}>
                            <div className="flex flex-row items-center gap-2">
                                <UserAvatarIcon
                                    url={author?.icon}
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
                                    )}>@{author?.username}</p>
                                </div>
                            </div>
                            <div className="flex flex-row items-center gap-4">
                                <div className="flex flex-row items-center gap-1">
                                    <div className="h-3 fill-primaryColor">
                                        <ViewsIcon />
                                    </div>
                                    <p className="font-interTight font-semibold text-sm text-primaryText">{article.views.length}</p>
                                </div>
                                <div className="flex flex-row items-center gap-1">
                                    <div className="h-3 fill-primaryColor">
                                        <LikeIcon stroked={true} />
                                    </div>
                                    <p className="font-interTight font-semibold text-sm text-primaryText">{article.likes.length}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row gap-1">
                            <ArticleLikeButton article={article} likeMutate={likeMutate} />
                            <ArticleSharePostButton url={window.location.href} />
                        </div>
                    </div>
                </div>
            </div>
            {coverImage}
            <div className="flex flex-col items-center gap-4 w-3/4">
                <div className="flex flex-col w-full gap-2">
                    {parseDecoratedText(article.content)}
                </div>
                <Comments article={article} />
            </div>
        </div>
    );
}

export default Article;