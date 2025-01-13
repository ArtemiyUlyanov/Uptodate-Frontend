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
import { useDictionary } from "@/hooks/useDictionary";
import { Pagination } from "@nextui-org/react";

export type ExplorePageArticlesProps = React.HTMLProps<HTMLDivElement> & {
}

const ExplorePageArticles: React.FC<ExplorePageArticlesProps> = ({
    children
}) => {
    const { articles, page, query, setQuery, setPage, totalElements, totalPages, isFetching } = useSearch();
    const searchParams = useSearchParams();

    const { language, translate } = useDictionary();
    const dispath = useDispatch();

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
                    <p color="primary" className={clsx(
                        'font-interTight font-medium'
                    )}>{query ? 
                            translate('explore.articles_found_with_query_text').replace('%count%', totalElements.toString()).replace('%query%', query) 
                        : 
                            translate('explore.articles_found_default_text').replace('%count%', totalElements.toString())
                        }
                    </p>
                    <ExplorePageFilters />
                </div>
                <div className={clsx(
                    'grid grid-cols-5 gap-4 w-full overflow-auto'
                )}>
                    {
                        articles.map((article, index) =>
                            <ArticleCover
                                key={index}
                                heading={article.heading}
                                description={article.description}
                                createdAt={article.createdAt}
                                query={query}
                                topics={article.topics}
                                author={article.author}
                                url={"/api/files/get?path=articles/" + article.id + "/icon.png"}
                            />
                        )
                    }
                </div>
            </div>
            <div className={clsx(
                'flex flex-col items-center gap-2'
            )}>
                <Pagination
                    hidden={totalPages <= 0}
                    initialPage={1}
                    page={page}
                    total={totalPages}
                    color="secondary"
                    onChange={(page: number) => setPage(page)}
                    isCompact
                    showControls
                    classNames={{
                        item: 'font-interTight font-semibold'
                    }}
                />
            </div>
        </div>
    );
}

export default ExplorePageArticles;