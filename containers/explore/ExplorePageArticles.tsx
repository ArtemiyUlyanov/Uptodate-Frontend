import ArticleCover from "@/components/articles/covers/ArticleCover";
import TransparentButton from "@/components/buttons/TransparentButton";
import { useSearch } from "@/hooks/explore/useSearch";
import { useTopics } from "@/hooks/useTopics";
import { Article } from "@/models/article";
import { RootState } from "@/store/store";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ExplorePageFilters from "./ExplorePageFilters";
import { useSearchParams } from "next/navigation";
import { addQuery, setHistory } from "@/store/features/history/historySlice";
import { useTranslations } from "next-intl";

export type ExplorePageArticlesProps = React.HTMLProps<HTMLDivElement> & {
}

const ExplorePageArticles: React.FC<ExplorePageArticlesProps> = ({
    children
}) => {
    const { articles, pagesCount, query, setQuery, setPagesCount, totalElements, isLoading } = useSearch();
    const searchParams = useSearchParams();

    const translate = useTranslations('explore');
    const dispath = useDispatch();

    const expandArticles = () => {
        setPagesCount(prev => articles.length < totalElements ? prev + 1 : prev);
    }

    useEffect(() => {
        const query = searchParams.get('query');
        setQuery(query || '');
        
        if (query) {
            dispath(addQuery({query}));
        }
    }, [searchParams]);

    return (
        <div className={clsx(
            'flex flex-col w-full items-center gap-6'
        )}>
            <div className={clsx(
                'flex flex-col w-full items-center gap-2'
            )}>
                <div className={clsx(
                    'flex flex-row w-full justify-between'
                )}>
                    <p className={clsx(
                        'font-interTight font-medium text-blueText'
                    )}>{query ? 
                            translate('articles_found_with_query_text').replace('%count%', totalElements.toString()).replace('%query%', query) 
                        : 
                            translate('articles_found_default_text').replace('%count%', totalElements.toString())
                        }
                    </p>
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
                )}>{translate('articles_showed_count_text').replace('%count%', articles.length.toString()).replace('%total%', totalElements.toString())}</p>
                <div>
                    <TransparentButton 
                        text={translate('articles_see_more_button')}
                        onClickButton={() => expandArticles()}
                        available={!isLoading}
                        customClassName={clsx(
                            'text-sm pt-2 pb-2 pl-3 pr-3',
                            articles.length >= totalElements && 'hidden'
                        )}
                    />
                </div>
            </div>
        </div>
    );
}

export default ExplorePageArticles;