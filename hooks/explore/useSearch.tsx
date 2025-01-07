"use client";

import { Article } from "@/models/article";
import { ApiSearchParams, ApiSearchResponse, searchApi } from "@/services/api/search.endpoint"
import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import { Dispatch, SetStateAction, useCallback, useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { FiltersContext, useFilters } from "./useFilters";
import { pages } from "next/dist/build/templates/app-page";

export const useSearchQuery = (
    params: ApiSearchParams,
    opts: Partial<UseQueryOptions<ApiSearchResponse>> = {},
) => {
    return useQuery<ApiSearchResponse>({
      queryKey: ['search', params.query, 'miniSearch', params.miniSearch],
      queryFn: () => searchApi(params),
      ...opts,
    });
}

type SearchContextType = {
  query: string
  articles: Article[]
  setQuery: Dispatch<SetStateAction<string>>
  pagesCount: number
  setPagesCount: Dispatch<SetStateAction<number>>
  totalElements: number
  isLoading: boolean
  performSearch: () => void
}

const defaultFilters: SearchContextType = {
    query: '',
    articles: [],
    setQuery: () => {},
    pagesCount: 1,
    setPagesCount: () => {},
    totalElements: 1,
    isLoading: false,
    performSearch: () => {}
}

export const SearchContext = createContext<SearchContextType>(defaultFilters);

export type SearchProviderProps = React.HTMLProps<HTMLDivElement> & {
}

export const SearchProvider: React.FC<SearchProviderProps> = ({
    children,
    ...props
}) => {
    const [query, setQuery] = useState('');
    const [pagesCount, setPagesCount] = useState<number>(1);
    const [totalElements, setTotalElements] = useState(1);
    const [articles, setArticles] = useState<Article[]>([]);

    const { filters } = useFilters();

    const { data, isLoading, error, refetch } = useSearchQuery(
        { 
            pagesCount: pagesCount,
            query: query,
            miniSearch: false,
            filters: filters
        },
        {
          enabled: false,
          refetchOnWindowFocus: false,
        },
    );

    const performSearch = useCallback(() => {
        refetch();
    }, [])

    useEffect(() => {
        refetch();
    }, []);
        
    useEffect(() => {
        refetch();
    }, [query, pagesCount, filters]);

    useEffect(() => {
        setPagesCount(1);
    }, [query, filters]);

    useEffect(() => {
        if (data?.articles) {
            setArticles(data.articles);
            setTotalElements(data.totalElements);
        }
    }, [data]);

    return (
        <SearchContext.Provider value={{ query, articles, setQuery, pagesCount, setPagesCount, totalElements, isLoading, performSearch }}>
            {children}
        </SearchContext.Provider>
    );
}

export const useSearch = () => useContext(SearchContext);