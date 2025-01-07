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

export type TopMenuSearchProps = React.HTMLProps<HTMLDivElement> & {

}

const TopMenuSearch: React.FC<TopMenuSearchProps> = ({
    ...props
}) => {
    const [result, setResult] = useState<Article[]>([]);
    const router = useRouter();

    const { searchInput, query, setQuery } = useLocalSearch(
        <IconInput
            placeholder='Search by name'
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
            count: 2,
            query: query,
            miniSearch: true,
            filters: {topics: [], sort_by: undefined}
        },
        {
            enabled: false,
            refetchOnWindowFocus: false,
        },
    );

    const onSeeMore = () => {
        router.push(`/explore?query=${encodeURIComponent(query)}`);
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
            {searchInput}
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
                        )}>Recent queries</p>
                        <div className={clsx(
                            'flex flex-col'
                        )}>
                            <p className={clsx(
                                'truncate font-interTight font-semibold text-primaryText'
                            )}>The size of dick how to figure out</p>
                            <p className={clsx(
                                'truncate font-interTight font-semibold text-primaryText'
                            )}>After I cooked this my husband fucked me like a bitch</p>
                            <p className={clsx(
                                'truncate font-interTight font-semibold text-primaryText'
                            )}>If the fart goes through the jeans can the mask prevent from the viruses?</p>
                        </div>
                    </div>
                    <div className={clsx(
                        'grid grid-cols-3 gap-4 w-full overflow-auto'
                    )}>
                        {
                            result.map((article, index) => {
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
                        <div 
                            className={clsx(
                                'flex flex-col justify-center items-center w-full h-full rounded-md bg-emphasizingColor',
                                'transition-all duration-200',
                                'sm:hover:opacity-50',
                                'active:opacity-50 sm:active:opacity'
                            )}
                            onClick={onSeeMore}
                        >
                            <p className={clsx(
                                'font-interTight font-semibold text-primaryText text-base'
                            )}>Watch more</p>
                        </div>
                    </div>
                </div>
                {/* <div>
                    <DefaultLink
                        text='See more'
                        link={`/explore?query=${encodeURIComponent(query)}`}
                        customClassName={clsx(
                            'font-interTight font-semibold text-secondaryText text-sm'
                        )}
                        actived={true}
                        underliningActived={false}
                    />
                </div> */}
            </div>
        </div>
    );
}

export default TopMenuSearch;