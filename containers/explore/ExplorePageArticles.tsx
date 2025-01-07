import ArticleCover from "@/components/articles/covers/ArticleCover";
import TransparentButton from "@/components/buttons/TransparentButton";
import { useSearch } from "@/hooks/explore/useSearch";
import { useTopics } from "@/hooks/useTopics";
import { Article } from "@/models/article";
import { RootState } from "@/store/store";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ExplorePageFilters from "./ExplorePageFilters";
import { useSearchParams } from "next/navigation";

export type ExplorePageArticlesProps = React.HTMLProps<HTMLDivElement> & {
}

const ExplorePageArticles: React.FC<ExplorePageArticlesProps> = ({
    children
}) => {
    const { articles, pagesCount, query, setQuery, setPagesCount, totalElements, isLoading } = useSearch();
    const searchParams = useSearchParams();

    const expandArticles = () => {
        setPagesCount(prev => articles.length < totalElements ? prev + 1 : prev);
    }

    useEffect(() => {
        setQuery(searchParams.get('query') || '');
    }, [searchParams]);

    return (
        <div className={clsx(
            'flex flex-col items-center gap-6'
        )}>
            <div className={clsx(
                'flex flex-col items-center gap-2'
            )}>
                <div className={clsx(
                    'flex flex-row w-full justify-between'
                )}>
                    <p className={clsx(
                        'font-interTight font-medium text-secondaryText'
                    )}>{`${totalElements} articles found`}</p>
                    <ExplorePageFilters />
                </div>
                <div className={clsx(
                    'grid grid-cols-3 gap-4 w-full overflow-auto'
                )}>
                    {
                        articles.map((article, index) => {
                            return <ArticleCover
                                key={index}
                                heading={article.heading}
                                description={article.description}
                                createdAt={article.createdAt}
                                query={query}
                                topics={article.topics}
                                author={article.author}
                                url={"/api/files/get?path=articles/" + article.id + "/icon.png"}
                            />;
                        })
                    }
                </div>
            </div>
            <div className={clsx(
                'flex flex-col items-center gap-2'
            )}>
                <p className={clsx(
                    'font-interTight font-medium text-secondaryText'
                )}>{`Showing ${articles.length} of ${totalElements} articles`}</p>
                <div>
                    <TransparentButton 
                        text='See more'
                        onClickButton={() => expandArticles()}
                        available={!isLoading}
                        customClassName={clsx(
                            'text-sm',
                            articles.length >= totalElements && 'hidden'
                        )}
                    />
                </div>
            </div>
        </div>
    );
}

export default ExplorePageArticles;