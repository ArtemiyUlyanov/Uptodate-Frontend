import { Comment } from "@/components/articles/comments/Comment";
import { CommentSendForm } from "@/components/forms/CommentSendForm";
import { useDictionary } from "@/hooks/useDictionary";
import { ArticleModel } from "@/models/article";
import { RootState } from "@/store/store";
import { Divider } from "@nextui-org/react";
import { useSelector } from "react-redux";

export type CommentsProps = {
    article: ArticleModel,
    updateData?: () => void
}

const Comments: React.FC<CommentsProps> = ({
    article,
    updateData
}) => {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    const { translate } = useDictionary();

    return (
        <div className="flex flex-col gap-2">
            {isAuthenticated &&
                <>
                    <Divider />
                    <CommentSendForm article={article} updateData={updateData} />
                </>
            }
            <Divider />
            <div className="flex flex-col pt-2 gap-2">
                <p className="font-interTight font-semibold text-sm text-secondaryText">Comments ({article.comments?.length || 0})</p>
                <div className="flex flex-col gap-4">
                    {article.comments?.map((comment, index) => <Comment key={index} comment={comment} updateData={updateData} />)}
                </div>
            </div>
        </div>
    );
}

export default Comments;