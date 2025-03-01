import { DashboardIcon } from "@/ui/icons/DashboardIcon";
import { DashboardUserArticlesTable } from "./DashboardUserArticlesTable";
import { ArticleModel } from "@/models/article";

export type DashboardContentProps = React.HTMLProps<HTMLDivElement> & {
    articles?: ArticleModel[]
    deleteArticle: (id: number) => void
}

export const DashboardContent: React.FC<DashboardContentProps> = ({
    articles,
    deleteArticle
}) => {
    return (
        <div className="flex flex-col gap-8 pl-12 pr-12 pt-8 pb-8 w-full">
            <div className="flex flex-row items-center gap-2">
                <div className="h-5 fill-secondaryText">
                    <DashboardIcon wrapped={true} />
                </div>
                <p className="font-interTight font-semibold text-lg text-primaryText">Dashboard</p>
            </div>
            <DashboardUserArticlesTable 
                articles={articles}
                deleteArticle={deleteArticle}
            />
        </div>
    );
}