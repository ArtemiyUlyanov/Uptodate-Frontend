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
      queryKey: ['search', params.query, 'mini_search', params.miniSearch, 'filters', params.filters, 'page', params.page],
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
  totalElements: number
  totalPages: number
  isFetching: boolean
  performSearch: () => void
}

const defaultFilters: SearchContextType = {
    query: '',
    articles: [],
    setQuery: () => {},
    page: 1,
    setPage: () => {},
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
    const [query, setQuery] = useState('');
    const [page, setPage] = useState<number>(1);
    const [totalElements, setTotalElements] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [articles, setArticles] = useState<Article[]>([]);

    const { filters } = useFilters();

    const { data, isFetching, refetch } = useSearchQuery(
        { 
            page: page,
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
    }, [query, page, filters]);

    useEffect(() => {
        setPage(1);
    }, [query, filters]);

    useEffect(() => {
        if (data?.articles) {
            setArticles(data.articles);
            setTotalElements(data.totalElements);
            setTotalPages(data.totalPages);
        }
    }, [data]);

    return (
        <SearchContext.Provider value={{ query, articles, setQuery, page, setPage, totalElements, totalPages, isFetching, performSearch }}>
            {children}
        </SearchContext.Provider>
    );
}

export const useSearch = () => useContext(SearchContext);