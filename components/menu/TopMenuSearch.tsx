import clsx from "clsx";
import IconInput from "../inputs/IconInput";
import { SearchIcon } from "../icons/SearchIcon";
import { useLocalSearch } from "@/hooks/explore/useLocalSearch";
import { useSearchQuery } from "@/hooks/explore/useSearch";
import { useEffect, useState } from "react";
import { Article } from "@/models/article";
import ArticleCover from "../articles/covers/ArticleCover";
import DefaultLink from "../links/DefaultLink";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { clearHistory } from "@/store/features/history/historySlice";
import { useTranslations } from "next-intl";
import { useDictionary } from "@/hooks/useDictionary";

export type TopMenuSearchProps = React.HTMLProps<HTMLDivElement> & {
    onPerformingSearch?: () => void
}

const TopMenuSearch: React.FC<TopMenuSearchProps> = ({
    onPerformingSearch,
    ...props
}) => {
    const [result, setResult] = useState<Article[]>([]);
    const router = useRouter();

    const { language, translate } = useDictionary();

    const { history } = useSelector((state: RootState) => state.history);
    const dispatch = useDispatch();

    const { searchInput, query, setQuery } = useLocalSearch(
        <IconInput
            placeholder={translate('common.search.search_placeholder')}
            customClassName='w-full'
            inputClassName='text-base'
            fullBordered={true}
            icon={
                <SearchIcon
                    className="fill-secondaryText" 
                />
            }
        />
    );

    const { data, isLoading, error, refetch } = useSearchQuery(
        { 
            count: 3,
            query: query,
            miniSearch: true,
            filters: {topics: [], sort_by: undefined}
        },
        {
            enabled: false,
            refetchOnWindowFocus: false,
        },
    );

    const performSearch = (event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLAnchorElement>, providedQuery?: string) => {
        event.preventDefault();
        onPerformingSearch && onPerformingSearch();

        router.push(`/explore?query=${encodeURIComponent(providedQuery || query)}`);
    }

    useEffect(() => {
        refetch();
    }, [query]);

    useEffect(() => {
        if (data?.articles) {
            setResult(data.articles);
        }
    }, [data]);
    
    return (
        <div className={clsx(
            'flex flex-col gap-4 p-8 pb-4 pt-0'
        )}>
            <form onSubmit={performSearch}>
                {searchInput}
            </form>
            <div className={clsx(
                'flex flex-col gap-8'
            )}>
                <div className={clsx(
                    'flex flex-row gap-8'
                )}>
                    <div className={clsx(
                        'flex flex-col w-1/5 gap-2'
                    )}>
                        <p className={clsx(
                            'whitespace-nowrap font-interTight font-semibold text-secondaryText'
                        )}>{translate('common.search.recent_queries_text')}</p>
                        <div className={clsx(
                            'flex flex-col gap-4 justify-between w-full'
                        )}>
                            <div className={clsx(
                                'flex flex-col'
                            )}>
                                {history.filter((query, index) => index < 3).map(query =>
                                    <div className={clsx(
                                        'w-auto'
                                    )}>
                                        <DefaultLink
                                            text={query}
                                            link=""
                                            onClick={(event: React.MouseEvent<HTMLAnchorElement>) => performSearch(event, query)}
                                            actived={true}
                                            customClassName='font-interTight font-semibold text-primaryText'
                                        />
                                    </div>
                                )}
                            </div>
                            <div className={clsx(
                                'w-auto'
                            )}>
                                <DefaultLink 
                                    text={translate('common.search.clear_history_button')}
                                    link=''
                                    onClick={(event: React.MouseEvent<HTMLAnchorElement>) => dispatch(clearHistory())}
                                    customClassName={clsx(
                                        'font-interTight font-semibold text-red-500 text-sm',
                                        history.length <= 0 && 'hidden'
                                    )}
                                    actived={true}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={clsx(
                        'flex flex-col items-end gap-1 w-full'
                    )}>
                        <div className={clsx(
                            'grid grid-cols-3 gap-4 w-full h-auto'
                        )}>
                            {
                                result.map((article, index) => {
                                    return <div>
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
                                    </div>
                                })
                            }
                        </div>
                        <p className={clsx(
                            'font-interTight font-semibold text-blueText text-sm',
                            result.length <= 0 && 'hidden'
                        )}>{translate('common.search.see_more_hint')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopMenuSearch;