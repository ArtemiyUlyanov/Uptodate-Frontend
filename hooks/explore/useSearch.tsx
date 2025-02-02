"use client";

import { ArticleModel } from "@/models/article";
import { ApiSearchParams, ApiSearchResponse, searchApi } from "@/services/api/search.endpoint";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { createContext, Dispatch, SetStateAction, useCallback, useContext, useEffect, useState } from "react";
import { useDebounced } from "../useDebounced";
import { useFilters } from "./useFilters";

export const useSearchQuery = (
    params: ApiSearchParams,
    opts: Partial<UseQueryOptions<ApiSearchResponse>> = {},
) => {
    return useQuery<ApiSearchResponse>({
      queryKey: ['search', params.query, 'mini_search', params.miniSearch, 'filters', params.filters, 'page', params.page],
      queryFn: () => searchApi(params),
      ...opts,
    });
}

type SearchContextType = {
  query: string
  articles: ArticleModel[]
  setQuery: Dispatch<SetStateAction<string>>
  pagesCount: number
  setPagesCount: Dispatch<SetStateAction<number>>
  totalElements: number
  totalPages: number
  isFetching: boolean
  performSearch: () => void
}

const defaultFilters: SearchContextType = {
    query: '',
    articles: [],
    setQuery: () => {},
    pagesCount: 1,
    setPagesCount: () => {},
    totalElements: 1,
    totalPages: 1,
    isFetching: false,
    performSearch: () => {}
}

export const SearchContext = createContext<SearchContextType>(defaultFilters);

export type SearchProviderProps = React.HTMLProps<HTMLDivElement> & {
}

export const SearchProvider: React.FC<SearchProviderProps> = ({
    children,
    ...props
}) => {
    const [query, setQuery] = useState<string>('');
    const debouncedQuery = useDebounced<string>(query);

    const [pagesCount, setPagesCount] = useState<number>(1);
    const [totalElements, setTotalElements] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [articles, setArticles] = useState<ArticleModel[]>([]);

    const { filters } = useFilters();

    const { data, isFetching, refetch } = useSearchQuery(
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
            setTotalPages(data.totalPages);
        }
    }, [data]);

    return (
        <SearchContext.Provider value={{ query: debouncedQuery, articles, setQuery, pagesCount, setPagesCount, totalElements, totalPages, isFetching, performSearch }}>
            {children}
        </SearchContext.Provider>
    );
}

export const useSearch = () => useContext(SearchContext);