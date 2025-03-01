import { DashboardIcon } from "@/ui/icons/DashboardIcon";
import { DashboardUserArticlesTable } from "./DashboardUserArticlesTable";
import { useAccount } from "@/hooks/models/useAccount";
import { useArticles } from "@/hooks/models/useArticles";
import { addToast } from "@heroui/toast";
import { TrashIcon } from "@/ui/icons/TrashIcon";
import { DashboardContent } from "./DashboardContent";
import { Spinner } from "@heroui/react";
import { UserModel } from "@/models/user";

export type DashboardProps = React.HTMLProps<HTMLDivElement> & {
    user?: UserModel
}

export const Dashboard: React.FC<DashboardProps> = ({
    user
}) => {
    const { articles, likeMutate, deleteMutate } = useArticles({ ids: user?.articlesIds || [] });
    const { isFetched: isUserFetched } = useAccount();

    const deleteArticle = (id: number) => {
        deleteMutate({ id });

        addToast({
            title: "Article deleted!",
            classNames: {
                title: 'font-interTight font-semibold text-primaryText',
                icon: 'h-4 fill-redColor',
                base: 'bg-emphasizingColor2 border-borderColor'
            },
            icon: (
                <TrashIcon />
            )
        });
    }

    return (
        (articles && isUserFetched ?
            <DashboardContent articles={articles} deleteArticle={deleteArticle} />
        :
            <div className="flex flex-col gap-4 items-center justify-center w-full h-full">
                <Spinner color="secondary" />
                <p className="font-interTight font-semibold text-primaryText">Loading your data...</p>
            </div>
        )
    );
}