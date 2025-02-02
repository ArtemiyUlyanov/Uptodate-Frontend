import { useAccount } from "@/hooks/account/useAccount";
import { ArticleCommentModel } from "@/models/article_comment";
import { likeCommentApi } from "@/services/api/comments.like.endpoint";
import { RootState } from "@/store/store";
import { LikeIcon } from "@/ui/icons/LikeIcon";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export type CommentLikeButtonProps = React.HTMLProps<HTMLDivElement> & {
    comment: ArticleCommentModel
    updateData?: () => void
}

export const CommentLikeButton: React.FC<CommentLikeButtonProps> = ({
    comment,
    updateData
}) => {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    const { user } = useAccount();

    const [ liked, setLiked ] = useState<boolean>(false);

    const toggleLiked = () => {
        setLiked(prev => !prev);

        if (isAuthenticated) {
            likeCommentApi({ id: comment.id })
                .then(() => updateData && updateData());
        }
    };
    
    useEffect(() => 
        setLiked(comment.likedUsernames?.includes(user?.username || '') || false)
    , [user, comment.likedUsernames]);

    return (
        <div 
            className={clsx(
                "flex flex-row items-center gap-1",
                "transition-all duration-200",
                isAuthenticated && "sm:hover:opacity-50",
                isAuthenticated && "active:opacity-50 sm:active:opacity"
            )}
            onClick={() => isAuthenticated && toggleLiked()}
        >
            <div 
                className={clsx(
                    "h-3",
                    
                    isAuthenticated && !liked && 'fill-secondaryColor',
                    isAuthenticated && liked && 'fill-redColor',

                    !isAuthenticated && 'fill-secondaryColor'
                )}
            >
                <LikeIcon stroked={(isAuthenticated && !liked) || !isAuthenticated} />
            </div>
            <p className={clsx(
                "font-interTight font-semibold text-sm",

                isAuthenticated && liked && 'text-redColor',
                isAuthenticated && !liked && 'text-secondaryColor',

                !isAuthenticated && 'text-secondaryColor'
            )}>{comment.likedUsernames.length}</p>  
        </div>
    );
}