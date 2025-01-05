"use client";

import { Article } from "@/models/article";
import { ApiSearchParams, ApiSearchResponse, searchApi } from "@/services/api/search.endpoint"
import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import { Dispatch, SetStateAction, useCallback, useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { FiltersContext, useFilters } from "./useFilters";

export const useSearchQuery = (
    params: ApiSearchParams,
    opts: Partial<UseQueryOptions<ApiSearchResponse>> = {},
) => {
    return useQuery<ApiSearchResponse>({
      queryKey: ['search', params.query],
      queryFn: () => searchApi(params),
      ...opts,
    });
}

type SearchContextType = {
  query: string
  articles: Article[]
  setQuery: Dispatch<SetStateAction<string>>
  page: number
  setPage: Dispatch<SetStateAction<number>>
  isPageAvailable: (page: number) => boolean
  totalPages: number
  performSearch: () => void
}

const defaultFilters: SearchContextType = {
    query: '',
    articles: [],
    setQuery: () => {},
    page: 1,
    setPage: () => {},
    isPageAvailable: () => false,
    totalPages: 1,
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
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState(1);
    const [articles, setArticles] = useState<Article[]>([]);

    const { filters } = useFilters();

    const searchQuery = useSearchQuery(
        { 
            page: page,
            query: query,
            filters: filters
        },
        {
          enabled: false,
          refetchOnWindowFocus: false,
        },
    );

    const isPageAvailable = (page: number) => {
        return page > 0 && page <= totalPages;
    }

    const performSearch = useCallback(() => {
        searchQuery.refetch();
    }, [])

    useEffect(() => {
        searchQuery.refetch();
    }, []);
        
    useEffect(() => {
        searchQuery.refetch();
    }, [query, page, filters]);

    useEffect(() => {
        setPage(1);
    }, [query, filters]);

    useEffect(() => {
        if (searchQuery.data?.articles) {
            setArticles(searchQuery.data.articles);
            setTotalPages(searchQuery.data.totalPages);
        }
    }, [searchQuery.data]);

    return (
        <SearchContext.Provider value={{ query, articles, setQuery, page, setPage, totalPages, isPageAvailable, performSearch }}>
            {children}
        </SearchContext.Provider>
    );
}

export const useSearch = () => useContext(SearchContext);