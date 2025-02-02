import ArticleCover from "@/components/articles/covers/ArticleCover";
import { useFilters } from "@/hooks/explore/useFilters";
import { useSearch } from "@/hooks/explore/useSearch";
import { useDictionary } from "@/hooks/useDictionary";
import { addQuery } from "@/store/features/history/historySlice";
import DefaultButton from "@/ui/buttons/DefaultButton";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Filters from "../filters/Filters";

export type ArticlesListProps = React.HTMLProps<HTMLDivElement> & {
}

const ArticlesList: React.FC<ArticlesListProps> = ({
    children
}) => {
    const { articles, query, setQuery, pagesCount, setPagesCount, totalElements, totalPages, isFetching } = useSearch();
    const searchParams = useSearchParams();

    const { filters, setFilter } = useFilters();

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
            'flex flex-col w-full pr-32 pl-32 items-center gap-12'
        )}>
            <div className={clsx(
                'flex flex-col w-full items-center gap-3'
            )}>
                <div className={clsx(
                    'flex flex-row w-full justify-between'
                )}>
                    <div className={clsx(
                        'flex flex-col gap-2'
                    )}>
                        <p color="primary" className={clsx(
                            'font-interTight font-semibold text-roseText'
                        )}>{query ? 
                                translate('explore.articles_found_with_query_text').replace('%count%', totalElements.toString()).replace('%query%', query) 
                            : 
                                translate('explore.articles_found_default_text').replace('%count%', totalElements.toString())
                            }
                        </p>
                    </div>
                    <Filters />
                </div>
                <div className={clsx(
                    'grid grid-cols-3 gap-8 items-start w-full'
                )}>
                    {
                        articles.map((article, index) =>
                            <ArticleCover
                                key={index}
                                article={article}
                                query={query}
                                extended={true}
                                url={"/api/files/get?path=articles/" + article.id + "/icon.png"}
                            />
                        )
                    }
                </div>
            </div>
            <div className={clsx(
                'flex flex-col items-center gap-2'
            )}>
                <p className="font-interTight font-semibold text-sm text-secondaryText">
                    {translate('explore.articles_showed_count_text').replace('%count%', articles.length.toString()).replace('%total%', totalElements.toString())}
                </p>
                <DefaultButton
                    text={translate('explore.articles_see_more_button')}
                    customClassName='font-interTight font-semibold text-sm'
                    type='submit'
                    onClickButton={() => setPagesCount((prev) => prev + 1)}
                    isLoading={isFetching}
                    isDisabled={articles.length >= totalElements}
                />
            </div>
        </div>
    );
}

export default ArticlesList;