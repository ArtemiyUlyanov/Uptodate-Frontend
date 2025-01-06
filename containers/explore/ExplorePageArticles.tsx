import ArticleCover from "@/components/articles/covers/ArticleCover";
import { useSearch } from "@/hooks/explore/useSearch";
import { useTopics } from "@/hooks/useTopics";
import { RootState } from "@/store/store";
import clsx from "clsx";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export type ExplorePageArticlesProps = React.HTMLProps<HTMLDivElement> & {
}

const ExplorePageArticles: React.FC<ExplorePageArticlesProps> = ({
    children
}) => {
    const { articles, page, setPage, isPageAvailable, totalPages } = useSearch();

    

    return (
        <div className={clsx(
            'flex flex-col items-center gap-4 w-full overflow-auto'
        )}>
            {
                articles.map((article, index) => {
                    return <ArticleCover
                        key={index}
                        heading={article.heading}
                        description={article.description}
                        createdAt={article.createdAt}
                        topics={article.topics}
                        author={article.author}
                        url={"/api/files/get?path=articles/" + article.id + "/icon.png"}
                    />;
                })
            }
            <div className={clsx(
                'flex flex-row items-center select-none gap-4',
                'font-interTight font-medium',
                totalPages <= 1 && 'hidden'
            )}>
                <div
                    className={clsx(
                        'transition-all duration-200',
                        'sm:hover:opacity-50',
                        'active:opacity-50 sm:active:opacity',
                        !isPageAvailable(page - 1) && 'opacity-50'
                    )}
                    onClick={() => setPage(prev => isPageAvailable(prev - 1) ? prev - 1 : prev)}
                >
                    ←
                </div>
                <p>Page</p>
                <p>{`${page}/${totalPages}`}</p>
                <div
                    className={clsx(
                        'transition-all duration-200',
                        'sm:hover:opacity-50',
                        'active:opacity-50 sm:active:opacity',
                        !isPageAvailable(page + 1) && 'opacity-50'
                    )}
                    onClick={() => setPage(prev => isPageAvailable(prev + 1) ? prev + 1 : prev)}
                >
                    →
                </div>
            </div>
        </div>
    );
}

export default ExplorePageArticles;