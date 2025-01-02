"use client";

import ArticleCover from '@/components/articles/covers/ArticleCover';
import TransparentButton from '@/components/buttons/TransparentButton';
import DefaultButton from '@/components/buttons/DefaultButton';
import { SearchIcon } from '@/components/icons/SearchIcon';
import { SearchTextIcon } from '@/components/icons/SearchTextIcon';
import IconInput from '@/components/inputs/IconInput';
import TransparentInput from '@/components/inputs/IconInput';
import article_icon_1 from '@/public/images/article_icon_1.png';
import article_icon_2 from '@/public/images/article_icon_2.png';
import article_icon_3 from '@/public/images/article_icon_3.png';
import { Article } from "@/models/article";
import { SearchProvider, useSearch } from '@/hooks/useSearch';
import clsx from 'clsx';
import React, { useEffect, useMemo, useState } from 'react';
import TransparentIconButton from '@/components/buttons/TransparentIconButton';
import filters_icon from "@/public/images/filters_icon.png";
import { FiltersIcon } from '@/components/icons/FiltersIcon';
import TextButton from '@/components/buttons/TextButton';
import Checkbox from '@/components/checkboxes/Checkbox';
import { useQuery } from '@tanstack/react-query';
import { ApiTopicsGetParams, ApiTopicsGetResponse, topicsGetApi } from '@/services/api/topics.get.endpoint';
import { TopicsProvider, useTopics } from '@/hooks/useTopics';
import { ArticleTopic, ParentTopicsSet } from '@/models/article_topic';
import ExplorePageSearch from './ExplorePageSearch';
import ExplorePageArticles from './ExplorePageArticles';
import { FiltersProvider } from '@/hooks/useFilters';
// import { OptionTemplate } from '@/components/optionbars/UnwrappingOptionBar';
// import { OptionBar } from '@/components/optionbars/UnwrappingOptionBar';

export type ExplorePageContentProps = React.HTMLProps<HTMLDivElement> & {
}

const ExplorePageContent: React.FC<ExplorePageContentProps> = ({
}) => {
    // const [query, setQuery] = useState('');
    // const [articles, setArticles] = useState<Article[]>([]);

    // const search = useSearch(
    //     { 
    //         query: query
    //     },
    //     {
    //       enabled: false,
    //       refetchOnWindowFocus: false,
    //     },
    // );

    // const onSearch = () => {
    //     search.refetch();
    // }

    // useEffect(() => {
    //     onSearch();
    // }, []);
    
    // useEffect(() => {
    //     onSearch();
    // }, [query]);

    // useEffect(() => {
    //     if (search.data?.articles) {
    //       setArticles(search.data.articles);
    //     }
    // }, [search.data]);

    return (
        <div className={clsx(
            'flex flex-col gap-4 w-[90%] sm:w-[75%] lg:w-[50%]'
        )}>
            <FiltersProvider>
                <SearchProvider>
                    <TopicsProvider>
                        <ExplorePageSearch />
                        <ExplorePageArticles />
                    </TopicsProvider>
                </SearchProvider>
            </FiltersProvider>
        </div>
    );
}

export default ExplorePageContent;