import { useAccount } from "@/hooks/account/useAccount";
import { ArticleModel } from "@/models/article";
import { likeArticleApi } from "@/services/api/articles.like.endpoint";
import { RootState } from "@/store/store";
import { LikeIcon } from "@/ui/icons/LikeIcon";
import { Button } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/react";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export type ArticleLikeButtonProps = React.HTMLProps<HTMLDivElement> & {
    article: ArticleModel,
    updateData?: () => void
}

export const ArticleLikeButton: React.FC<ArticleLikeButtonProps> = ({
    article,
    updateData
}) => {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    const { user } = useAccount();

    const [ liked, setLiked ] = useState<boolean>();

    const toggleLiked = () => {
        setLiked(prev => !prev);

        if (isAuthenticated) {
            likeArticleApi({ id: article.id })
                .then(() => updateData && updateData());
        }
    };
    
    useEffect(() => 
        setLiked(article.likedUsernames?.includes(user?.username || '') || false)
    , [user, article.likedUsernames]);

    return (
        <Tooltip
            content={!liked ? 'Like this post' : 'Unlike the post'}
            closeDelay={0}
            className={clsx(
                !isAuthenticated && 'hidden'
            )}
            classNames={{
                content: 'bg-backgroundColor font-interTight font-semibold text-primaryColor'
            }}
        >
            <Button
                isIconOnly
                className={clsx(
                    'bg-[transparent]',
                    'transition-all duration-200',
                    !isAuthenticated && 'hidden'
                )}
                onPress={toggleLiked}
                size="sm"
                variant='light'
            >
                <div 
                    className={clsx(
                        "h-4",
                        !liked && 'fill-primaryColor',
                        liked && 'fill-redColor',
                    )}
                >
                    <LikeIcon stroked={!liked} />
                </div>
            </Button>
        </Tooltip>
    );
}