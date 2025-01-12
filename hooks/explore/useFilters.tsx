"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

export type FiltersType = {
    topics: string[]
    sort_by: string | undefined
}

type FiltersContextType = {
    filters: FiltersType
    setFilter: (key: string, value: any) => void
    clearFilters: () => void
}

const defaultFilters: FiltersContextType = {
    filters: {topics: [], sort_by: 'Ascending'},
    setFilter: (key: string, value: any) => {},
    clearFilters: () => {}
}

export const FiltersContext = createContext<FiltersContextType>(defaultFilters);

export type FiltersProviderProps = React.HTMLProps<HTMLDivElement>

export const FiltersProvider: React.FC<FiltersProviderProps> = ({
    children,
    ...props
}) => {
    const [filters, setFilters] = useState<FiltersType>({
        topics: [], 
        sort_by: 'Ascending'
    });

    const setFilter = useCallback((key: string, value: any) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }));
    }, []);

    const clearFilters = useCallback(() => {
        setFilters({
            topics: [],
            sort_by: 'Ascending'
        });
    }, []);

    return (
        <FiltersContext.Provider value={{ filters, setFilter, clearFilters }}>
            {children}
        </FiltersContext.Provider>
    );
}

export const useFilters = () => useContext(FiltersContext);