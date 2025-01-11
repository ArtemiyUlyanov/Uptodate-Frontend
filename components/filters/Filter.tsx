'use client';

import { useFilters } from "@/hooks/explore/useFilters"
import clsx from "clsx"
import { FiltersIcon } from "../icons/FiltersIcon"
import { CheckboxCheckedIcon } from "../icons/CheckboxCheckedIcon"
import { useEffect, useMemo, useRef, useState } from "react"
import { UnwrappingElementIcon } from "../icons/UnwrappingElementIcon"
import { useLocalSearch, UseLocalSearchResponse } from "@/hooks/explore/useLocalSearch"
import { splitQueryText } from "@/utils/text_utils"
import IconInput from "../inputs/IconInput"
import { SearchIcon } from "../icons/SearchIcon"
import { useTranslations } from "next-intl"
import DefaultOptionbar from "../optionbars/DefaultOptionbar";
import RelativeOptionbar, { OptionTemplate } from "../optionbars/RelativeOptionbar";

export type FilterProps = React.HTMLProps<HTMLDivElement> & {
    name: string
    options: FilterOption[]
    toggleFilter: (option: string) => void
    isSelected: (option: string) => boolean
    queryProperties?: QueryProps
}

export type FilterOption = {
    name: string
    value: string
}

export type QueryProps = {
    localSearch?: UseLocalSearchResponse
}

export const ChildFilter: React.FC<FilterProps> = ({
    name,
    options,
    toggleFilter,
    isSelected,
    queryProperties
}) => {
    const [isUnwrapped, setIsUnwrapped] = useState(false);
    const { filters, setFilter } = useFilters();

    const { query } = queryProperties?.localSearch || {query: ''};

    const queriedOptions = useMemo<OptionTemplate[]>(() => 
        options.filter(option => option.value.toLowerCase().includes(query.toLowerCase())).map(option => 
            ({
                name: option.name,
                selected: isSelected(option.value),
                action: () => toggleFilter(option.value)
            })
        )
    , [query, options]);

    return (
        <RelativeOptionbar 
            name={name}
            textClassName="text-base"
            hideIfEmpty={true}
            queryOptions={{
                localSearch: queryProperties?.localSearch
            }}
            options={queriedOptions}
        />
    );
}

export const SingleFilter: React.FC<FilterProps> = ({
    name,
    options,
    toggleFilter,
    isSelected
}) => {
    const [isUnwrapped, setIsUnwrapped] = useState(false);
    const { filters, setFilter } = useFilters();

    return (
        <DefaultOptionbar
            y_axis="bottom"
            x_axis="left"
            textClassName="text-base"
            name={name}
            options={options.map(option =>
                ({
                    name: option.name,
                    selected: isSelected(option.value),
                    action: () => toggleFilter(option.value)
                })
            )}
        />
    );
}