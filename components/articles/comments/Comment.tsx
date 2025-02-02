import { CommentEditForm } from "@/components/forms/CommentEditForm";
import { useAccount } from "@/hooks/account/useAccount";
import { ArticleCommentModel } from "@/models/article_comment";
import { deleteCommentApi } from "@/services/api/comments.delete.endpoint";
import { RootState } from "@/store/store";
import { EditIcon } from "@/ui/icons/EditIcon";
import { TrashIcon } from "@/ui/icons/TrashIcon";
import { UserAvatarIcon } from "@/ui/icons/UserAvatarIcon";
import { formatDateExtended } from "@/utils/date_utils";
import { Button, Divider, Tooltip } from "@nextui-org/react";
import clsx from "clsx";
import { useState } from "react";
import { useSelector } from "react-redux";
import { CommentLikeButton } from "../likes/CommentLikeButton";

export type CommentProps = {
    comment: ArticleCommentModel
    updateData?: () => void
}

export const Comment: React.FC<CommentProps> = ({
    comment,
    updateData
}) => {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    const { user } = useAccount();

    const [ showEditForm, setShowEditForm ] = useState<boolean>(false);

    const deleteComment = () => {
        deleteCommentApi({ id: comment.id })
            .then(() => updateData && updateData());
    }

    return (
        <div className={clsx(
            'flex flex-row gap-2 items-start'
        )}>
            <div className="flex flex-col gap-2 h-full items-center">
                <div className="mt-1">
                    <UserAvatarIcon
                        url={'/api/files/get?path=' + (comment.author && comment.author?.icon)}
                        size="sm"
                        className='w-full h-full aspect-square object-cover'
                    />
                </div>
                <div className="h-full">
                    <Divider orientation="vertical" />
                </div>
            </div>
            <div className={clsx(
                'flex flex-col w-full items-start gap-2'
            )}>
                <div className="flex flex-row gap-4 items-center">
                    <div className="flex flex-col">
                        <p className={clsx(
                            'relative font-interTight font-semibold text text-sm text-primaryText line-clamp-1'
                        )}>{comment.author?.firstName + " " + comment.author?.lastName}</p>
                        <p className={clsx(
                            'relative font-interTight font-medium text text-sm text-roseText line-clamp-1'
                        )}>{formatDateExtended(comment.createdAt)}</p>
                    </div>
                    {isAuthenticated && comment.author.id === user?.id &&
                        <div className="flex flex-row items-center">
                            <Tooltip
                                content='Delete the comment'
                                closeDelay={0}
                                classNames={{
                                    content: 'bg-backgroundColor font-interTight font-semibold text-primaryColor'
                                }}
                            >
                                <Button
                                    isIconOnly
                                    className={clsx(
                                        'bg-[transparent]',
                                        'transition-all duration-200'
                                    )}
                                    onPress={deleteComment}
                                    size="sm"
                                    variant='light'
                                >
                                    <div className="h-4 fill-redColor">
                                        <TrashIcon />
                                    </div>
                                </Button>
                            </Tooltip>
                            <Tooltip
                                content='Edit the comment'
                                closeDelay={0}
                                classNames={{
                                    content: 'bg-backgroundColor font-interTight font-semibold text-primaryColor'
                                }}
                            >
                                <Button
                                    isIconOnly
                                    className={clsx(
                                        'bg-[transparent]',
                                        'transition-all duration-200',
                                    )}
                                    onPress={() => setShowEditForm(prev => !prev)}
                                    size="sm"
                                    variant='light'
                                >
                                    <div className="h-3">
                                        <EditIcon />
                                    </div>
                                </Button>
                            </Tooltip>
                        </div>
                    }
                </div>
                <p className="font-interTight font-medium text-sm text-primaryColor">{comment.content}</p>
                {comment.resources?.map((resource, index) =>
                    <img 
                        key={index} 
                        src={'/api/files/get?path=' + resource} 
                        alt={`Preview ${index}`} 
                        className="w-24 h-24 object-cover rounded-lg border"
                    />
                )}
                <CommentLikeButton comment={comment} updateData={updateData} />
                {isAuthenticated && comment.author.id == user?.id && showEditForm &&
                    <CommentEditForm comment={comment} updateData={updateData} setShowEditForm={setShowEditForm} />
                }
            </div>
        </div>
    );
}